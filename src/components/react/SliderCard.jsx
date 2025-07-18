export default function SliderCard({ aProduct }) {
  const { name, description, imgUrl } = aProduct;

  return (
    <div className="shadow-[0px_7px_10px_0px_rgba(0,0,0,0.2)] min-h-[350px] rounded-[5px] p-7">
      <div className="bg-slate-200 h-[150px] rounded-[5px] w-full">
        <img
          src={imgUrl}
          alt={name}
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div>
        <h4 className="font-[800] text-[#808080] mt-5">{name}</h4>
        <p className="text-#808080 font-lighter mt-1">{description}</p>
      </div>
    </div>
  );
}
