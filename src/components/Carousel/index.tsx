import { Box, Image, Text, VStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const slides = [
    {
        src: "https://s.zst.com.br/cms-assets/2021/12/shutterstock_1922086325-1-.webp",
        alt: "First slide"
    },
    {
        src: "https://s2.glbimg.com/FDCWRJGoynOFy2s9miHbU1cpgwE=/e.glbimg.com/og/ed/f/original/2020/08/23/perfumessite.jpg",
        alt: "Second slide"
    },
    {
        src: "https://www.katiaribeiro.com.br/wp-content/uploads/2024/08/image-357-1024x683.png",
        alt: "Third slide"
    }
];

const MotionBox = motion(Box);

    function ChakraCarousel() {
        const [index, setIndex] = useState(0);
        const [direction, setDirection] = useState(1);

        const variants = {
            enter: () => ({
                x: direction > 0 ? 100 : -100,
                opacity: 0
            }),
            center: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.5 }
            },
            exit: () => ({
                x: direction < 0 ? 100 : -100,
                opacity: 0,
                transition: { duration: 0.5 }
            })
        };

        const nextSlide = () => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % slides.length);
        };

        const prevSlide = () => {
            setDirection(-1);
            setIndex((prev) => (prev - 1 + slides.length) % slides.length);
        };


        return (
            <VStack spacing={4} w="full" align="center">
                <Box position="relative" w="800px" h="400px" overflow="hidden" borderRadius="lg">
                    <IconButton
                        aria-label="Previous slide"
                        icon={<FaChevronLeft />}
                        position="absolute"
                        left={2}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={2}
                        onClick={prevSlide}
                        variant={"ghost"}
                    />
                    <AnimatePresence custom={direction} exitBeforeEnter>
                        <MotionBox
                            key={index}
                            w="full"
                            h="full"
                            position="absolute"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={direction}
                        >
                            <Image src={slides[index].src} alt={slides[index].alt} w="full" h="full" objectFit="cover" />
                        </MotionBox>
                    </AnimatePresence>
                    <IconButton
                        aria-label="Next slide"
                        icon={<FaChevronRight />}
                        position="absolute"
                        right={2}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={2}
                        onClick={nextSlide}
                        variant={"ghost"}
                    />
                </Box>
            </VStack>
        );
    }

export default ChakraCarousel;
