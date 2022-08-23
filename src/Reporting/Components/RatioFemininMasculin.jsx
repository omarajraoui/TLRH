import {useEffect, useState} from "react";
import {Doughnut} from "react-chartjs-2";
import ReportingService from "../ReportingService";
import * as ReactBootStrap from "react-bootstrap";

const ChartGraph = (data, options) => {
  return (
    <div className="w-5/12 m-auto p-1 ">
      <h2 className="text-xl m-2 text-center font-bold  ">
        Graphe du Ratio Féminin Masculin en %
      </h2>
      <Doughnut options={options} data={data}/>
    </div>
  );
};

const labels = ["Féminin", "Masculin"];

const RatioFemininMasculin = () => {
  const [datas, setDatas] = useState({"F":0,"M":0});
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    setloading(true);
    try {
      //data could use some time to render so we use the await
      //so we convert the method to async
      const response = await ReportingService.getSexe();
      setDatas(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const resData = [datas.F, datas.M];
  const datay = resData.map(e => (e* 100/((datas.F + datas.M ) || 0)).toFixed(2));
  console.log(datay)

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datay,

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgb(54, 200, 255)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        position: "bottom",
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    <div className="mx-2 my-2 bg-stone-50 rounded-lg border border-gray-200 shadow-md">
      {/* Components of table and chart of Evolution  */}

      <h1 className="text-2xl m-2 mb-4 text-center font-bold ">
        Le Ratio Féminin Masculin
      </h1>

      {!loading ? (
        ChartGraph(data, options)
      ) : (
        <div className="text-center m-auto p-1 ">
          <ReactBootStrap.Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

export default RatioFemininMasculin;
