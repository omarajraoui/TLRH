import {Doughnut} from "react-chartjs-2";
import {useEffect, useState} from "react";
import ReportingService from "../ReportingService";

const coutByCritere = (arrayTechno, data, name) => {
  const res = [];
  arrayTechno.forEach((techno) => {
    let cpt = 0;
    data.forEach((e) => {
      if (e[name] == techno) {
        cpt++;
      }
    });
    res.push(cpt);
  });
  return res;
};
const generateValues = (dataArray) => {
  const ecole = [];
  const niveau = [];
  const promotion = [];
  const typeDiplome = [];
  const typeEcole = [];
  dataArray.forEach((e) => {
    ecole.push(e["ecole"]);
    niveau.push(e["niveau"]);
    promotion.push(e["promotion"]);
    typeDiplome.push(e["typeDiplome"]);
    typeEcole.push(e["typeEcole"]);
  });

  return [ecole, niveau, promotion, typeDiplome, typeEcole];
};

const ChartGraph = (data, options, name) => {
  return (
    <div className="lg:w-full md:w-full sm:w-8/12 m-auto  p-1 ">
      <h2 className="text-xl m-2 text-center font-bold  ">
        Graphe de pourcentage par {name}
      </h2>
      <Doughnut options={options} data={data} />
    </div>
  );
};

const labels = ["ENSIAS", "AIAC", "FST", "INPT"];
const Etudes = () => {
  const [datas, setDatas] = useState([
    {
      diplomeID: 0,
      ecole: "",
      niveau: "",
      promotion: "",
      typeDiplome: "",
      typeEcole: "",
    },
  ]);
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    setloading(true);
    try {
      //data could use some time to render so we use the await
      //so we convert the method to async
      const response = await ReportingService.getDiplomes();
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

  const labels1 = Array.from(new Set(generateValues(datas)[0]));
  const labels2 = Array.from(new Set(generateValues(datas)[1]));
  const labels3 = Array.from(new Set(generateValues(datas)[3]));
  const datay1 = coutByCritere(labels1, datas, "ecole").map(e => (e* 100/datas.length).toFixed(2));
  const datay2 = coutByCritere(labels2, datas, "niveau").map(e => (e* 100/datas.length).toFixed(2));
  const datay3 = coutByCritere(labels3, datas, "typeDiplome").map(e => (e* 100/datas.length).toFixed(2));
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "Dataset 1",
        data: datay1,
        backgroundColor:  Array.from({length: labels1.length}, () => {
          let r = () => Math.random() * 256 >> 0;
          return `rgb(${r()}, ${r()}, ${r()})`
        }),
      },
    ],
  };
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "Dataset 1",
        data: datay2,
        backgroundColor:  Array.from({length: labels2.length}, () => {
          let r = () => Math.random() * 256 >> 0;
          return `rgb(${r()}, ${r()}, ${r()})`
        }),
      },
    ],
  };

  const data3 = {
    labels: labels3,
    datasets: [
      {
        label: "Dataset 1",
        data: datay3,
        backgroundColor: Array.from({length: labels3.length}, () => {
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
    <div className="mx-2 my-2 bg-stone-50 rounded-lg border border-gray-200 shadow-md ">
      {/* Components of table and chart of Evolution  */}

      <h1 className="text-2xl m-2 pb-2 mb-4 text-center font-bold ">
        Le pourcentage par études
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-3 content-center">
        {ChartGraph(data1, options, "école en %")}
        {ChartGraph(data2, options, "diplôme en %")}
        {ChartGraph(data3, options, "type de diplôme en %")}
      </div>
    </div>
  );
};

export default Etudes;
