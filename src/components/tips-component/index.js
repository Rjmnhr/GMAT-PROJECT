import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Divider,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

const AdmissionTips = () => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "20px",
        background: "#f4f4f4",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Keys to Successful Admission
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Take the GMAT: If you haven't already, prioritize taking the GMAT as it is a factor you can significantly improve." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Clarity of Goals: Clearly articulate your goals and demonstrate how they align with the school you're applying to." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Link Your Background to Your Future: Showcase the relevance of your background to your future aspirations." />
        </ListItem>
        <ListItem>
          <ListItemText primary="MBA Readiness: Convey your preparedness for an MBA and highlight your enthusiasm for the program." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Strengths and Weaknesses: Illustrate how you will build on strengths and address weaknesses during and after the MBA." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Leadership and Teamwork: Demonstrate your leadership and teamwork skills through relevant experiences." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Life Lessons: Share personal lessons and how you've developed as an individual." />
        </ListItem>
      </List>
      <Box mt={3} mb={3}>
        <Divider />
      </Box>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Extra Points
      </Typography>
      <List>
        <ListItem>
          <StarIcon color="primary" />
          <ListItemText primary="Articulation of Thoughts: Clearly express your ideas and thoughts." />
        </ListItem>
        <ListItem>
          <StarIcon color="primary" />
          <ListItemText primary="Succinct Resume: Ensure your resume is concise and highlights key achievements." />
        </ListItem>
        <ListItem>
          <StarIcon color="primary" />
          <ListItemText primary="Great LinkedIn Profile: Optimize your LinkedIn profile to reflect your professional journey and achievements." />
        </ListItem>
        <ListItem>
          <StarIcon color="primary" />
          <ListItemText primary="Timely Application: Submit your application on time to show your commitment and organizational skills." />
        </ListItem>
      </List>
    </Paper>
  );
};

export default AdmissionTips;
