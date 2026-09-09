import Axios from "axios";

const baseUrl = import.meta.env.BASE_URL;

export const getQuotes = async () => {
  const res = await Axios.get(`${baseUrl}data/quotes.json`);
  return res.data;   
};

export const getImages = async () => {
  const res = await Axios.get(`${baseUrl}data/carousel.json`);
  return res.data;
};
