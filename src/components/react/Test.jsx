import { useEffect, useState } from "react";

export default function Test({ preset, name }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const upload = e.target.files[0];
    setFile(upload);
  };

  useEffect(() => {
    console.log("A file has been uploaded:", file);
  }, [file]);

  const uploadFile = async (e) => {
    e.preventDefault(); // to prevent moving to #

    const url = `https://api.cloudinary.com/v1_1/${name}/upload`;

    // we create the form data to append the file data
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", preset);

    try {
      const response = await fetch(url, { method: "POST", body: fd });

      const data = await response.json();

      const imgUrl = data.url;

      return imgUrl;
    } catch (error) {
      console.log("Ha ocurrido un error subiendo la imagen:", error);
      return { ok: false, error: true };
    }
  };

  return (
    <form onSubmit={uploadFile}>
      <input type="file" onChange={handleFileChange} />
      <input type="submit" value="subir" />
    </form>
  );
}
