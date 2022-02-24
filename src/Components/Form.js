import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import MuiPhoneNumber from "material-ui-phone-number";




const useStyles = makeStyles({
  container: { marginTop: "2%",marginBottom : "10%" },
  heading: {
    paddingBottom: "20px",
    color: "#1976d2",
  },
});

function Form() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: null,
    pdf: null,
  };
  const [isLoading, setLoading] = useState(false);
  const [pdfArr, setPdfArr] = useState([]);
  const [imgArr, setimggArr] = useState([]);

  const classes = useStyles();

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your first name")
      .min(1, "Name should be of minimum 1 characters length")
      .required("First Name is required"),
    lastName: yup
      .string("Enter your last name")
      .min(1, "Name should be of minimum 1 characters length")
      .required("Last Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .string("Enter your phone number")
      .min(10, "10 Digit Phone Number")
      .required("Phone is required"),
    pdf: yup
      .array()
      .required("A file is required")
      .test("fileFormat", "PDF only", (value) => {
        let returnVal = false;
        for (let i = 0; i < value.length; i++) {
          const splitValue = value[i].split(".");
          if ([splitValue[1]].includes("pdf")) {
            returnVal = true;
          } else {
            returnVal = false;
            break;
          }
          return returnVal;
        }
      }),
    images: yup
      .array()
      .required("A file is required")
      .test("fileFormat", "Jpg/png only", (value) => {
        let returnVal = false;
        for (let i = 0; i < value.length; i++) {
          const splitValue = value[i].split(".");
          console.log(
            [splitValue[1]].includes("jpg") || [splitValue[1]].includes("png")
          );
          if (
            [splitValue[1]].includes("jpg") ||
            [splitValue[1]].includes("png")
          ) {
            returnVal = true;
          } else {
            returnVal = false;
            break;
          }
          return returnVal;
        }
      }),
  });



  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pdf: [],
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      const data =  JSON.stringify(values, null, 2);
      setLoading(true);
      try {
        const response = await axios.post("http://test.com", data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });





  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Container className={classes.container} component="main" maxWidth="xs">
          <div>
            <Typography className={classes.heading} component="h1" variant="h5">
              Sign up
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} size="small">
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  variant="outlined"
                  fullWidth
                  defaultCountry={"us"}
                  name="phone"
                  label="Phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={(e) => formik.setFieldValue("phone", e)}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                InputLabelProps={{ shrink: false }}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment:<div><p>{imgArr.length}</p><PictureAsPdfIcon /></div>,
                  }}
                  type="file"
                  id="pdf"
                  name="pdf"
                  // value={formik.values.pdf}
                  onChange={(e) => {
                    setPdfArr([...pdfArr, e.target.value]);
                    formik.setFieldValue("pdf", [...pdfArr, e.target.value]);
                  }}
                  error={formik.touched.pdf && Boolean(formik.errors.pdf)}
                  helperText={formik.touched.pdf && formik.errors.pdf}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{ shrink: false }}
                  variant="outlined"
                  fullWidth
                  type="file"
                  id="images"
                  name="images"
                  InputProps={{
                    endAdornment: <div><p>{imgArr.length}</p><PhotoCamera /></div>,
                  }}
                  onChange={(e) => {
                    setimggArr([...imgArr, e.target.value]);
                    formik.setFieldValue("images", [...imgArr, e.target.value]);
                  }}
                  error={formik.touched.images && Boolean(formik.errors.images)}
                  helperText={formik.touched.images && formik.errors.images}
                />
                
              </Grid>
            </Grid>
                  <div style={{display: 'flex',marginTop: '20px'}}>
                  <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
            {isLoading && <CircularProgress size={28} />}
                  </div>
            
          </div>
        </Container>
      </form>
    </div>
  );
}

export default Form;
