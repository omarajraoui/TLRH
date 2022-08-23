import { useHistory } from "react-router-dom";

const Rapports = () => {
  const history = useHistory();
  return (
    <div className="mx-8 my-8 p-3 grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-8 content-center bg-stone-50 rounded-lg border border-gray-200 shadow-md">
      <h1 className="text-2xl mx-auto lg:col-span-4 sm:col-span-1 md:col-span-2 font-bold ">
        Bilans de compétences
      </h1>

      {/* <button
        onClick={() => history.push("/reports/salaire")}
        className=" bg-[#CFC7FF] hover:bg-cyan-500 text-[#1F4690] py-4 px-4 rounded"
      >
        Evolution de salaire
      </button>

      <button
        onClick={() => history.push("/reports/posteApp")}
        className=" bg-[#CFFFC7] hover:bg-cyan-500 text-[#1F4690]  py-4 px-4 rounded "
      >
        Evolution du poste APP
      </button>
      <button
        onClick={() => history.push("/reports/competence")}
        className=" bg-[#FFCDC7] hover:bg-cyan-500 text-[#1F4690]  py-4 px-4 rounded"
      >
        Matrice de compétence
      </button> */}
      <button
        onClick={() => history.push("/reports/ratioFemininMasculin")}
        className=" bg-[#91BDC2] hover:bg-cyan-500 text-[#1F4690]  py-4 px-4 rounded"
      >
        Ratio Féminin masculin
      </button>
      <button
        onClick={() => history.push("/reports/recrutement")}
        className=" bg-[#FFD7CA] hover:bg-cyan-500 text-[#6C6C6C]  py-4 px-4 rounded"
      >
        Evolution recrutement par année
      </button>
      {/* <button
        onClick={() => history.push("/reports/turnOver")}
        className=" bg-cyan-800 hover:bg-cyan-700 text-white  py-4 px-4 rounded"
      >
        Taux de turn over
      </button> */}
      <button
        onClick={() => history.push("/reports/technologie")}
        className=" bg-[#EE95C5] hover:bg-cyan-500 text-[#6C6C6C]  py-4 px-4 rounded"
      >
        Pourcentage de chaque technologie
      </button>
      <button
        onClick={() => history.push("/reports/etudes")}
        className=" bg-[#74C1ED] hover:bg-cyan-500 text-[#1F4690] py-4 px-4 rounded"
      >
        Pourcentage par école, par diplôme, par type de diplôme
      </button>
    </div>
  );
};

export default Rapports;
