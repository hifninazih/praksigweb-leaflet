export default function Title() {
  return (
    <div className="flex p-2 sm:w-[30rem] sm:rounded-full justify-center flex-col items-center sm:mt-5 bg-white sm:border-2 border-gray-600/50 border-b-2">
      <h1 className="text-2xl font-bold text-gray-600">Peta Gempabumi</h1>
      <p className="text-gray-600 px-2 text-center">
        Data kejadian gempabumi terbaru yang terjadi di seluruh wilayah
        Indonesia. Data diambil dari{" "}
        <a
          target="_blank"
          className="text-blue-600"
          href="https://data.bmkg.go.id/gempabumi/"
        >
          Data Gempabumi Terbuka BMKG
        </a>
        .
      </p>
    </div>
  );
}
