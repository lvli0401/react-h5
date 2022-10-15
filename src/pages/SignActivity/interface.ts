export interface activityProp {
    /**
       * 活动ID
       */
     activityId: string;
     /**
      * 地址
      */
     address: string;
     /**
      * 注意事项
      */
     attention?: string;
     /**
      * 活动内容
      */
     content: string;
     /**
      * 活动创建人
      */
     creator?: string;
     /**
      * 活动描述
      */
     desc?: string;
     /**
      * 活动结束时间，Date
      */
     endTime: string;
     /**
      * 活动图片存储路径，根据该路径下载活动图片
      */
     imagePath?: string;
     /**
      * 人数限制
      */
     numberLimit?: number;
     /**
      * 活动开始时间，Date
      */
     startTime: string;
     /**
      * 活动标题
      */
     title: string;
}