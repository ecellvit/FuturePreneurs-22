import Head from "next/head";
import styles from "../styles/Home.module.css";
import Questions from "../components/quizQuestions/Questions";
import { useSession } from "next-auth/react";

export default function Quiz() {
  return <Questions />;
}
