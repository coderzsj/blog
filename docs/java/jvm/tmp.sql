SELECT
	max(b.mdtrt_id) AS 查询条件,
	max(a.EMP_NO) AS 单位编号,
	max(a.EMP_NAME) AS 单位名称,
	max(a.PSN_NAME) AS 姓名,
	max(a.GEND) AS 性别,
	max(floor (a.age) ) AS 年龄,
	max(a.PSN_TYPE) AS 人员类别,
	max(a.CERTNO) AS 身份证号,
	max(b.FIXMEDINS_NAME) AS 医院名称,
	sum(a.MEDFEE_SUMAMT)   AS 总金额,
	max(b.BEGNTIME)  AS 开始时间,
	max(b.ENDTIME)  AS 结束时间,
	max(TO_DAYS( b.ENDTIME ) - TO_DAYS( b.BEGNTIME ) + 1) '天数',
	max(a.CRTE_TIME)  '审核时间',
	max(b.CRTE_TIME)  '申报时间',
	sum(a.INSCP_AMT) AS 医保内金额,
	sum(a.MEDFEE_SUMAMT - a.INSCP_AMT) AS 医保外金额,
	sum(a.ACCT_PAY) AS 个人账户支付,
	max(a.MED_TYPE) AS 医疗类别,
 max( CASE WHEN a.MED_TYPE IN ( '11', '1104', '1105', '12', '13', '140201', '18' ) THEN 1 ELSE 2 END )
	 AS medFlag,
sum(CASE WHEN a.MED_TYPE IN ( '11', '1104', '1105', '12', '13', '140201', '18' ) THEN a.HIFOB_PAY + a.HIFMI_PAY ELSE 0
	END) AS 门诊大额医疗补助基金支出（大额互助资金支付）,
sum(CASE WHEN a.MED_TYPE IN ( '11', '1104', '1105', '12', '13', '140201', '18' ) THEN 0 ELSE a.HIFOB_PAY + a.HIFMI_PAY
	END) AS 住院大额医疗补助基金支出（大额互助资金支付）,
	sum(a.HIFP_PAY) AS 统筹基金支出,
	sum(a.HIFES_PAY) AS 退休人员补充医疗保险支付,
	sum(a.HIFDM_PAY) AS 残疾军人医疗保险补助,
	sum(a.CVLSERV_PAY) AS 单位补充医疗保险,
	sum(a.SELFPAY1) AS 自付一,
	sum(a.SELFPAY2) AS 自付二,
	sum(a.FULAMT_OWNPAY_AMT  + a.OVERLMT_SELFPAY) AS 自费,
	sum(CASH_PAYAMT) AS 本次报销支付个人现金,
	GROUP_CONCAT(b.medrcdno) AS 病历号,
	sum(c.ATT_VAL) AS 单据张数
FROM
	bj_setl_d a,
	mdtrt_evt_c b,
	cent_manl_reim_reg_evt_c c
WHERE
	a.MDTRT_ID = b.MDTRT_ID
	AND a.PSN_NO = b.PSN_NO
	AND b.mdtrt_id = c.mdtrt_id
	AND a.vali_flag = '1'
	AND b.vali_flag = '1'
	AND c.vali_flag = '1'

 and a.PSN_NO = '11000010000000000118768123'  and a.MDTRT_ID in ( '336001' , '610001' )
