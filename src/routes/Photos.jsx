import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = async (id) => {
    // TODO: answer here
    await fetch(`http://localhost:3001/photos/${id}`, {
      method: "DELETE",
  })
  .then(() => {
    setPhotos(photos.filter(photo => photo.id !== id))
  })

  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    fetch(`http://localhost:3001/photos?_sort=id&_order=${sort}&q=${search}`)
    .then((response) => response.json())
    .then((buku) => setPhotos(buku));

 setLoading(false)
  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/photos")
      .then((response) => response.json())
      .then((buku) => setPhotos(buku));

    setLoading(false)
    // TODO: answer here
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;