import cn.hutool.core.convert.Convert;
import cn.hutool.core.text.csv.CsvData;
import cn.hutool.core.text.csv.CsvReader;
import cn.hutool.core.text.csv.CsvRow;
import cn.hutool.core.text.csv.CsvUtil;
import com.demo.platform.yjhapi.YjhApiApplication;
import com.demo.platform.yjhapi.domain.CarDriving;
import com.demo.platform.yjhapi.mapper.CarDrivingMapper;
import com.demo.platform.yjhapi.utils.GUIDHelper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = YjhApiApplication.class)
public class WirteDataApplicationTests {
    @Autowired
    private CarDrivingMapper carDrivingMapper;

    @Test
    public void Test1() {
        CsvReader reader = CsvUtil.getReader();
        //从文件中读取CSV数据
        CsvData data = reader.read(new File("./data.csv"));
        List<CsvRow> rows = data.getRows();

        int rowsDataSize = rows.size() - 1;

        List<CarDriving> carDrivingList = new ArrayList<>();
        for (int i = 1; i < rows.size(); i++) {
            CsvRow csvRow = rows.get(i);

            CarDriving model = new CarDriving();
            model.setId(GUIDHelper.Guid32());
            model.setLongitude(Convert.toDouble(csvRow.get(5)));
            model.setLatitude(Convert.toDouble(csvRow.get(6)));
            model.setSpeed(Convert.toDouble(csvRow.get(12)));
            model.setMileage(Convert.toDouble(csvRow.get(9)));
            model.setAltitude(Convert.toDouble(csvRow.get(1)));
            model.setDirection(Convert.toDouble(csvRow.get(2)));
            model.setAccelerator(Convert.toDouble(csvRow.get(7)));
            model.setTorquePercentage(Convert.toDouble(csvRow.get(8)));
            model.setTotalFuelConsumption(Convert.toDouble(csvRow.get(10)));
            model.setInstantFuelConsumption(Convert.toDouble(csvRow.get(11)));
            model.setEngineSpeed(Convert.toDouble(csvRow.get(13)));
            model.setGear(Convert.toDouble(csvRow.get(14)));
            model.setDrivingMode(Convert.toDouble(csvRow.get(15)));
            model.setOrderBy(i);
            carDrivingList.add(model);

            if (i % 200 == 0) {
                carDrivingMapper.batchInsertCarDriving(carDrivingList);
                carDrivingList = new ArrayList<>();
                System.out.println("共" + rowsDataSize + "行，已添加" + i + "行，剩余" + (rowsDataSize - i) + "行");
            }
        }
    }
}
