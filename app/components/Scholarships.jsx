"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  useToast,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [studentPercentage, setStudentPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();
  const studentId = "66f8ef4c65ca84d4482b5a7d";

  // Use Chakra's color mode hook
  const { colorMode } = useColorMode();
  
  // Define color values for light and dark modes
  const cardBgColor = useColorModeValue("orange.200", "orange.600");
  const buttonBgColor = useColorModeValue("blue.400", "blue.600");
  const buttonTextColor = useColorModeValue("white", "gray.900");
  const panelBgColor = useColorModeValue("white", "gray.700");
  const panelBorderColor = useColorModeValue("black", "white");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/scholarship");
        setScholarships(response.data);
      } catch (err) {
        setError("Error fetching scholarships");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchStudentData = () => {
      try {
        const storedPercentage = localStorage.getItem("studPercentage");
        if (storedPercentage) {
          setStudentPercentage(storedPercentage);
        } else {
          console.warn("No percentage found in localStorage.");
        }
      } catch (err) {
        console.error("Error fetching student data from localStorage:", err);
      }
    };

    fetchScholarships();
    fetchStudentData();
  }, [studentId]);

  const handleApply = (scholarship) => {
    const isEligible = checkEligibility(scholarship, studentPercentage);
    if (isEligible) {
      toast({
        title: `You successfully applied for ${scholarship.name}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: `You are not eligible to apply for ${scholarship.name}.`,
        description: `You need at least ${scholarship.percentageEligibility}% to apply. Your Percentage is ${studentPercentage}%`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const checkEligibility = (scholarship, studentPercentage) => {
    return studentPercentage >= scholarship.percentageEligibility;
  };

  if (loading) return <div className="flex justify-center items-center text-2xl">Loading...</div>;
  if (error) return <div className="flex justify-center items-center text-2xl">{error}</div>;

  return (
    <div className="ml-32 md:ml-0 lg:ml-0 lg:px-5 px-5 mt-10 mb-5 flex flex-col justify-center items-center shadow-md shadow-gray-400 w-3/4 py-2">
      <h1 className="text-3xl font-bold">Scholarship Dashboard</h1>
      <Accordion allowMultiple>
        <div className={`show-dash flex flex-col gap-8 ${cardBgColor} px-5 py-3 border-2 ${panelBorderColor} rounded-md`}>
          {scholarships.map((scholarship) => (
            <AccordionItem key={scholarship._id}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" className="font-semibold text-lg">
                        {scholarship.name}
                      </Box>
                      {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg={panelBgColor} borderColor={panelBorderColor}>
                    <div className={`desc p-2 flex flex-col gap-2 ${panelBgColor}`}>
                      <p>{scholarship.description}</p>
                      <p className="font-bold">Eligibility: {scholarship.percentageEligibility}%</p>
                      <p>Max Amount: ₹{scholarship.maxAmount}</p>
                      <p>Guidelines: {scholarship.guidelines}</p>
                      <Button
                        bg={buttonBgColor}
                        color={buttonTextColor}
                        _hover={{ bg: useColorModeValue("blue.500", "blue.700") }}
                        className="p-1 rounded-lg transition-all font-bold"
                        onClick={() => handleApply(scholarship)}
                      >
                        Apply
                      </Button>
                    </div>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default Scholarships;
