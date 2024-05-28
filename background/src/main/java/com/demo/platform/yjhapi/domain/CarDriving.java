package com.demo.platform.yjhapi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 车辆驾驶数据对象 car_driving
 *
 * @author xs
 * @date 2022-04-23 15:31:48
 */

@Data
public class CarDriving {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    private String id;

    /**
     * 经度
     */
    private Double longitude;

    /**
     * 纬度
     */
    private Double latitude;

    /**
     * 速度
     */
    private Double speed;

    /**
     * 里程
     */
    private Double mileage;

    /**
     * 海拔
     */
    private Double altitude;

    /**
     * 方向
     */
    private Double direction;

    /**
     * 油门
     */
    private Double accelerator;

    /**
     * 扭矩百分比
     */
    private Double torquePercentage;

    /**
     * 总油耗
     */
    private Double totalFuelConsumption;

    /**
     * 瞬时油耗
     */
    private Double instantFuelConsumption;

    /**
     * 发动机转速
     */
    private Double engineSpeed;

    /**
     * 档位
     */
    private Double gear;

    /**
     * 驾驶模式（1：自动驾驶，以外：人工驾驶）
     */
    private Double drivingMode;

    /**
     * 排序
     */
    private Integer orderBy;

    //region 关联属性
    /**
     * 行驶时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime traveltime;
    //endregion
}
