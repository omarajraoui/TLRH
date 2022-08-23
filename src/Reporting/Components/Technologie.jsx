import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import ReportingService from "../ReportingService";

import * as ReactBootStrap from "react-bootstrap";

const ChartGraph = (data, options) => {
  return (
    <div className="w-5/12 m-auto p-1 ">
      <h2 className="text-xl m-2 text-center font-bold  ">
        Graphe de pourcentage des technologies en %
      </h2>
      <Doughnut options={options} data={data} />
    </div>
  );
};
const coutTechnologies = (arrayTechno, data) => {
  const res = [];
  arrayTechno.forEach((techno) => {
    let cpt = 0;
    data.forEach((e) => {
      if (e["name"] == techno) {
        cpt++;
      }
    });
    res.push(cpt);
  });
  return res;
};
const generateValues = (dataArray) => {
  const competenceName = [];
  const expertise = [];
  dataArray.forEach((e) => {
    competenceName.push(e["name"]);
    expertise.push(e["note"]);
  });

  return [competenceName, expertise];
};
const Technologie = () => {
  const [datas, setDatas] = useState([
    {
      competenceId: 0,
      name: "",
      note: "",
    },
  ]);

  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    setloading(true);
    try {
      //data could use some time to render so we use the await
      //so we convert the method to async
      const response = await ReportingService.getCompetences();
      setDatas(response.data);
      //console.log(datas);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  useEffect(() => {
    fetchData();
    //console.log(datas);
  }, []);
  const labels = Array.from(new Set(generateValues(datas)[0]));
  const datay = coutTechnologies(labels, datas).map(e => (e* 100/datas.length).toFixed(2));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datay,
        backgroundColor: Array.from({length: datas.length}, () => {
          let r = () => Math.random() * 256 >> 0;
          return `rgb(${r()}, ${r()}, ${r()})`
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
        Le pourcentage des technologies
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

export default Technologie;
