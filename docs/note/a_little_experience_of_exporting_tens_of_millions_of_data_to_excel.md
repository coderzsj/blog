---
title: be-a-critical-thinking-programmer
category: note
tag:
  - note
---
  
# 千万级的数据用 EXCEL 导出

最近做了个项目,使用 MYSQL 数据库,要求做到千万级的数据用 EXCEL 导出,试了良久,找出了几个方法.

## 问题

JAVA 实现大数据量导出操作时，如果采用 POI 直接导出，会出现内存溢出的情况。再者 EXCEL 的 SHEET 也存在行数的限制，Excel2003 版最大行数是 655536 行、Excel2007 版最大行数是 1048576 行、Excel2010 版最大行数是 1048576 行。

## 解决方案

1. 先统计总的记录数，如果大于一定数目则采用压缩文件方式导出
2. 采用分页方式从数据库中获取数据，并生成多个 Excel 临时文件
3. 将临时文件 Excel 压缩导出
4. 删除服务器上的临时文件

注：
使用流式读取,耗时 3 分钟,速度还可以再优化,就是占用内存太大,1000W 数据占了 3G 运存,关键字为 `resultSetType="FORWARD_ONLY" fetchSize="-2147483648"`

但是这样得话老大非找我麻烦不可.不过百万左右的数据用这个,速度是真快 3.使用两者结合,在 mybatis 里开启流式读取,并且启用分批读取
这样数据量大的时候分批读取也不会太慢,读取一批数据,处理一批数据并清空,然后读取下一段,这样耗时 10 分钟左右,256M 内存也正常运行,配合 easyexcel

```java
class T {
    @RequestMapping(value = "/exportExcelFile", produces = {"text/plain;charset=UTF-8"})
    public void excelDownLoad(Map params, HttpServletResponse response) throws Exception {
        QueryParam queryParam = new QueryParam();
        Long allRowNumbers = 0L;
        Long rowMaxCount = 60000L;
        // 查询记录数
        allRowNumbers = ossFileListBiz.totalRecord(queryParam.getSqlMap());

        // 是否大数据量（超过6W）
        if (allRowNumbers > rowMaxCount) {
            List list = new ArrayList();
            List downList = new ArrayList();
            // 1.设置相应头
            String filename = "导出TEST.zip";
            filename = new String(filename.getBytes("GBK"), "iso-8859-1");
            response.reset();
            response.setContentType("application/octet-stream;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment;filename=" + filename);
            response.addHeader("pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");

            // 2.设置批次文件名
            String fileSuff = "";
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            fileSuff = sdf.format(new Date());
            String fileName = "导出TEST" + fileSuff;
            List<String> fileNames = new ArrayList<String>(); // 存放生成的文件名称
            String filePath = "D:/excel/"; // 上线后切换成linux服务器地址
            if (!new File(filePath).exists()) {
                new File(filePath).mkdirs();
            }
            File zip = new File(filePath + fileName + ".zip"); // 压缩文件路径

            // 3.分批次生成excel
            Long tempsize = (allRowNumbers % rowMaxCount) == 0 ? allRowNumbers / rowMaxCount
                    : allRowNumbers / rowMaxCount + 1;
            for (int i = 0; i < tempsize; i++) {
                if (i == (allRowNumbers / rowMaxCount)) {
                    queryParam.setPageNow((i + 1));
                    queryParam.setPageSize(Integer.valueOf(String.valueOf(rowMaxCount)));
                    // params.put("startNum", i*rowMaxCount);
                    // params.put("endNum", allRowNumbers);
                } else {
                    // params.put("startNum", i*rowMaxCount);
                    // params.put("endNum", (i+1)*rowMaxCount);
                    queryParam.setPageNow((i + 1));
                    queryParam.setPageSize(Integer.valueOf(String.valueOf(rowMaxCount)));
                }
                list = ossFileListBiz.findList(queryParam);

                // 3.2生成excel
                String tempExcelFile = filePath + fileName + "[" + (i + 1) + "-pic].xlsx";
                fileNames.add(tempExcelFile);
                FileOutputStream fos = new FileOutputStream(tempExcelFile);
                int rowMemory = 100;
                SXSSFWorkbook wb = new SXSSFWorkbook(rowMemory);
                try {
                    wb = exportDataToExcelXLSX(wb, list);
                    wb.write(fos);
                    fos.flush();
                    fos.close();
                } catch (RuntimeException runMsg) {
                    throw new Exception("查询数据信息异常 ");
                } finally {
                    fos.flush();
                    fos.close();
                    // 手动清除list
                    list.clear();
                    downList.clear();
                }
            }
            // 4.导出zip压缩文件
            exportZip(response, fileNames, zip);
        } else {
            System.out.println("导出失败");
        }
    }

    /**
     * 文件压缩并导出到客户端
     *
     * @param outPut
     * @param fileNames
     * @param zip
     * @throws FileNotFoundException
     * @throws IOException
     */
    private void exportZip(HttpServletResponse response, List<String> fileNames, File zip)
            throws FileNotFoundException, IOException {
        OutputStream outPut = response.getOutputStream();

        // 1.压缩文件
        File srcFile[] = new File[fileNames.size()];
        for (int i = 0; i < fileNames.size(); i++) {
            srcFile[i] = new File(fileNames.get(i));
        }
        byte[] byt = new byte[1024];
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zip));
        // out.setEncoding("UTF-8");
        for (File file : srcFile) {
            FileInputStream in = new FileInputStream(file);
            out.putNextEntry(new ZipEntry(file.getName()));
            int length;
            while ((length = in.read(byt)) > 0) {
                out.write(byt, 0, length);
            }
            out.closeEntry();
            in.close();
        }
        out.close();

        // 2.删除服务器上的临时文件(excel)
        for (File temFile : srcFile) {
            if (temFile.exists() && temFile.isFile()) {
                temFile.delete();
            }
        }

        // 3.返回客户端压缩文件
        FileInputStream inStream = new FileInputStream(zip);
        byte[] buf = new byte[4096];
        int readLenght;
        while ((readLenght = inStream.read(buf)) != -1) {
            outPut.write(buf, 0, readLenght);
        }
        inStream.close();
        outPut.close();

        // 4.删除压缩文件
        if (zip.exists() && zip.isFile()) {
            zip.delete();
        }
    }

    /**
     * 设置excel样式和数值
     *
     * @param wb
     * @param listMap
     * @param companyatr
     * @return
     * @throws Exception
     */
    private static SXSSFWorkbook exportDataToExcelXLSX(SXSSFWorkbook wb, List<Object> listMap) throws Exception {
        String[] assetHeadTemp = {"ID", "路径"};
        String[] assetNameTemp = {"id", "path"};
        Sheet sheet = null;
        CellStyle columnHeadStyle = wb.createCellStyle();
        columnHeadStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);// 下边框
        columnHeadStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框
        columnHeadStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框
        columnHeadStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框
        columnHeadStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        columnHeadStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        columnHeadStyle.setWrapText(true);
        Font f = wb.createFont();// 字体
        f.setFontHeightInPoints((short) 9);// 字号
        f.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// BOLDWEIGHT_BOLD);// 加粗
        columnHeadStyle.setFont(f);
        Row row;
        Cell cell;
        sheet = wb.createSheet("sheet");
        row = sheet.createRow(0);
        sheet.createFreezePane(0, 1, 0, 1);
        for (int i = 0; i < assetHeadTemp.length; i++) {
            cell = row.createCell(i);
            cell.setCellStyle(columnHeadStyle);
            cell.setCellValue(assetHeadTemp[i]);
            sheet.setColumnWidth(i, (int) 7000);
        }
        if (listMap != null && listMap.size() > 0) {
            int rowIndex = 1;
            for (Object m : listMap) {
                Map map = objectToMap(m);
                row = sheet.createRow(rowIndex++);
                int index = 0;
                for (int i = 0; i < assetNameTemp.length; i++) {
                    cell = row.createCell(index++);
                    cell.setCellValue(map.get(assetNameTemp[i]) != null ? map.get(assetNameTemp[i]).toString() : "");
                }
            }
        }
        return wb;
    }

    public static Map<String, Object> objectToMap(Object obj) throws Exception {
        if (obj == null)
            return null;
        Map<String, Object> map = new HashMap<String, Object>();
        BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        for (PropertyDescriptor property : propertyDescriptors) {
            String key = property.getName();
            if (key.compareToIgnoreCase("class") == 0) {
                continue;
            }
            Method getter = property.getReadMethod();
            Object value = getter != null ? getter.invoke(obj) : null;
            map.put(key, value);
        }
        return map;
    }
}
```
