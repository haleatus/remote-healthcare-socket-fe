"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Wifi,
  Clock,
  MessageSquare,
  Activity,
  Stethoscope,
} from "lucide-react";

import { IconType } from "react-icons";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description: string;
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="text-primary mb-4" size={48} />
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-center text-muted-foreground">{description}</p>
  </motion.div>
);

interface HealthTipProps {
  tip: string;
}

const HealthTip = ({ tip }: HealthTipProps) => (
  <motion.div
    className="bg-secondary p-4 rounded-lg mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-secondary-foreground text-center">{tip}</p>
  </motion.div>
);

export default function Home() {
  const [showHealthTip, setShowHealthTip] = useState(false);
  const [healthTipIndex, setHealthTipIndex] = useState(0);

  const healthTips = [
    "Stay hydrated! Aim to drink at least 8 glasses of water a day.",
    "Regular exercise can boost your mood and improve overall health.",
    "Don't skip breakfast - it's the most important meal of the day!",
    "Get 7-9 hours of sleep each night for optimal health.",
    "Practice mindfulness or meditation to reduce stress.",
  ];

  const showNextHealthTip = () => {
    setHealthTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
    setShowHealthTip(true);
  };

  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome
      </motion.h1>
      <motion.p
        className="text-xl mb-8 text-muted-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bridging the gap between you and quality healthcare, no matter the
        distance.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <FeatureCard
          icon={Wifi}
          title="Remote Access"
          description="Connect with top-rated doctors from the comfort of your home"
        />
        <FeatureCard
          icon={Clock}
          title="24/7 Availability"
          description="Access healthcare professionals anytime, anywhere"
        />
        <FeatureCard
          icon={MessageSquare}
          title="Secure Messaging"
          description="Communicate with your doctor securely through our platform"
        />
      </motion.div>

      <motion.div
        className="mb-8 flex justify-center flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex justify-center">
          <Button onClick={showNextHealthTip} className="mb-4 w-fit">
            Get a Health Tip
          </Button>
        </div>
        {showHealthTip && <HealthTip tip={healthTips[healthTipIndex]} />}
      </motion.div>

      <motion.div
        className="space-y-4 flex gap-3 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button
          asChild
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Link href="/doctors">
            <Stethoscope className="mr-2 h-4 w-4" />
            Find a Remote Doctor
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/signup">
            <Activity className="mr-2 h-4 w-4" />
            Start Your Health Journey
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
