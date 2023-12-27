import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
 
  Box,
  Divider,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

const AdmissionTips = () => {
  return (
    <>
      <div className="mb-5 p-0">
      <h3><strong>Keys to Successful Admission</strong></h3>  
      </div>

     
        <List>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                Take the GMAT
              </span>
              : If you haven't already, prioritize taking the GMAT as it is a
              factor you can significantly improve.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                Clarity of Goals
              </span>
              : Clearly articulate your goals and demonstrate how they align
              with the school you're applying to.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                Link Your Background to Your Future
              </span>
              : Showcase the relevance of your background to your future
              aspirations.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                MBA Readiness
              </span>
              : Convey your preparedness for an MBA and highlight your
              enthusiasm for the program.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                Strengths and Weaknesses
              </span>
              : Illustrate how you will build on strengths and address
              weaknesses during and after the MBA.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                Leadership and Teamwork
              </span>
              : Demonstrate your leadership and teamwork skills through relevant
              experiences.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <span style={{ fontWeight: "bold" }} className="text-primary">
                Life Lessons
              </span>
              : Share personal lessons and how you've developed as an
              individual.
            </p>
          </ListItem>
        </List>
        <Box mt={3} mb={3}>
          <Divider />
        </Box>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Extra Points
        </Typography>
        <List>
          <ListItem className="d-flex align-items-start">
            <StarIcon className="mr-3 mt-1 mt-1" style={{ color: "#049494" }} />
            <ListItemText primary="Articulation of Thoughts: Clearly express your ideas and thoughts." />
          </ListItem>
          <ListItem className="d-flex align-items-start">
            <StarIcon className="mr-3 mt-1" style={{ color: "#049494" }} />
            <ListItemText primary="Succinct Resume: Ensure your resume is concise and highlights key achievements." />
          </ListItem>
          <ListItem className="d-flex align-items-start">
            <StarIcon className="mr-3 mt-1" style={{ color: "#049494" }} />
            <ListItemText primary="Great LinkedIn Profile: Optimize your LinkedIn profile to reflect your professional journey and achievements." />
          </ListItem>
          <ListItem className="d-flex align-items-start">
            <StarIcon className="mr-3 mt-1" style={{ color: "#049494" }} />
            <ListItemText primary="Timely Application: Submit your application on time to show your commitment and organizational skills." />
          </ListItem>
        </List>
   
    </>
  );
};

export default AdmissionTips;
