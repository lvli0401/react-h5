/**
 * ActivityCreateRequest
 */
export interface SignupActivityProps {
    /**
     * 活动地址
     */
    address: string;
    /**
     * 注意事项
     */
    attention?: string;
    /**
     * 活动内容路径，调用文件上传接口返回的路径
     */
    content: string;
    /**
     * 创建人
     */
    creator?: string;
    /**
     * 活动介绍内容存储路径，调用文件上传接口返回的路径
     */
    desc?: string;
    /**
     * 图片存储路径，调用文件上传接口返回的路径
     */
    imagePath?: string;
    /**
     * 人数限制
     */
    numberLimit?: string;
    /**
     * 活动开始时间，毫秒时间戳
     */
    startTime: Date;
    /**
     * 活动开始时间，毫秒时间戳
     */
     endTime: Date;
    /**
     * 活动标题
     */
    title: string;
}