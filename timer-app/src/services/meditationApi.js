import Axios from "axios";

export const getQuotes = async () => {
  const res = await Axios.get("/data/quotes.json");
  return res.data;   
};

export const getImages = async () => {
  const res = await Axios.get("/data/carousel.json");
  return res.data;
};
