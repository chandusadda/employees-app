import { Container, Grid } from "@mui/material";

const Footer = (): JSX.Element => {
  const redirectUrl = "https://reactjs.org";
  return (
    <footer className="footer">
      <Container fixed className="footer-container">
      <Grid container spacing={2} className="text-muted footer-grid-container">
          <Grid item xs={10} className="text-start">
            <ul className="list-inline">
              <li key="company" className="list-inline-item">
                <span className="text-muted">
                  &copy; {new Date().getFullYear()}{" "}
                  <a
                    href={redirectUrl}
                    className="text-muted text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`React`}
                  </a>
                </span>
              </li>
              <li key="privacy" className="list-inline-item">
                <span className="font-weight-bold mr-2">|</span>
                <span className="text-muted">Privacy Policy</span>
              </li>
              <li key="terms" className="list-inline-item">
                <span className="font-weight-bold mr-2">|</span>
                <span className="text-muted">Terms of Use</span>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
