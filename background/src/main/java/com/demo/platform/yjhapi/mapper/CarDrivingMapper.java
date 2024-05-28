package com.demo.platform.yjhapi.mapper;

import com.demo.platform.yjhapi.domain.CarDriving;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 车辆驾驶数据Mapper接口
 *
 * @author xs
 * @date 2022-04-23 15:31:48
 */
@Mapper
@Repository
public interface CarDrivingMapper {
    /**
     * 查询固定行的车辆驾驶数据
     *
     * @param row 行数
     * @return 车辆驾驶数据
     */
    public CarDriving selectCarDrivingByRow(int row);

    /**
     * 查询车辆驾驶数据行数
     *
     * @return 结果
     */
    public int selectCarDrivingCount();

    /**
     * 新增车辆驾驶数据
     *
     * @param carDriving 车辆驾驶数据
     * @return 结果
     */
    public int insertCarDriving(CarDriving carDriving);

    /**
     * 批量新增车辆驾驶数据
     *
     * @param carDriving 车辆驾驶数据
     * @return 结果
     */
    public int batchInsertCarDriving(List<CarDriving> carDriving);
}
