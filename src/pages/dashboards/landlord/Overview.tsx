import { useEffect } from "react";
import AxiosInstance from "../../../services/axiosInstance";
import { useAuth } from "../../../contexts/AuthContext";

const Overview = () => {
  const { user } = useAuth();

  console.log(user);

  const fetchAllPropertiesForLandlord = () => {
    AxiosInstance.get("/landlords/allproperties")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllPropertiesForLandlord();
  }, []);
  return <div>Overview</div>;
};

export default Overview;
