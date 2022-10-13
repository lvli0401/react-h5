export interface activityProps {
    activityId: number; // 活动id
    name: string // 活动名称
    startTime: string // 开始时间
    endTime: string // 结束时间
    status: number // 1, 2, 3  初始， 通过， 失败
    /**
     * 报名年龄
     */
    age?: number;
    /**
     * 报名时间
     */
    applyTime?: Date;
    /**
     * 报名邮箱
     */
    email?: string;
    /**
     * 小程序用户ID
     */
    openId?: string;
    /**
     * 报名手机号
     */
    phone?: string;
    /**
     * 报名性别，1-男 2-女
     */
    sex?: number;
    /**
     * 报名姓名
     */
    userName?: string;
    /**
     * 报名人数
     */
    userNumber?: number;
}