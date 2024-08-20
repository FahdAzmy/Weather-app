import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import moment from "moment";
// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null;
function App() {
  const [dateAndTime, setDate] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    descrbtion: "",
    min: null,
    max: null,
    icon: null,
  });
  useEffect(() => {
    setDate(moment().format("MMM Do Y"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.101105&lon=31.21968399999999&appid=7d59c950f9a17d75538ec964816d2cd3",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        console.log(response);
        const number = Math.round(response.data.main.temp - 272.15);
        const descrbtion = response.data.weather[0].description;
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const weatherIcon = response.data.weather[0].icon;
        setTemp({
          number,
          descrbtion,
          min,
          max,
          icon: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir="rtl"
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    الوراق
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}{" "}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div style={{ display: "flex" }}>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      {/* TODO: TEMP IMAGE */}
                      <img src={temp.icon} alt="weathrIcon" />
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h5">{temp.descrbtion}</Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>Max {temp.max}</h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>Min {temp.min}</h5>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*== CARD ==*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button style={{ color: "white" }} variant="text">
                إنجليزي
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
