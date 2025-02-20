"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const membershipPlans = [
  {
    title: "Professional Membership",
    price: "Free",
    features: [
      "All Premium Membership features",
      "One-on-one career counseling",
      "Resume review and job placement assistance",
      "Voting rights in club elections",
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Membership Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap w-[40%] mx-auto justify-center items-center">
          {membershipPlans.map((plan, index) => (
            <Card key={index} className="flex flex-col col-span-3">
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <span className="text-sm"> / year</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full">Choose Plan</Button>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
