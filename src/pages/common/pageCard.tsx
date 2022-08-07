import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

const PageCard = (props: any) => {
  const { toLink, name, description } = props;
  return (
    <Link to={toLink} className="text-decoration-none text-dark main-card-link">
      <Card className="text-center main-card" elevation={6}>
        <CardActionArea>
          <IconButton aria-label="page" color="primary" className="main-icon">
            {name === "Employees" ? <GroupIcon /> : <GroupRemoveIcon />}
          </IconButton>
          <CardContent className="pt-0">
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PageCard;
