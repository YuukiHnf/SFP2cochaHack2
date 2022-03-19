import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  incrementByAmount,
  selectConunt,
  decrement,
  increment,
} from "../features/conterSlice";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectConunt);
  const [incrementAmount, setIncrementAmount] = useState<number | null>();

  return (
    <>
      <h2>{`The current number is ${count}`}</h2>
      <div>
        <input
          value={incrementAmount ? incrementAmount : 0}
          type="number"
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button
          onClick={() =>
            incrementAmount && dispatch(incrementByAmount(incrementAmount))
          }
        >
          Increment by Amount
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>Dec</button>
        <button onClick={() => dispatch(increment())}>Inc</button>
      </div>
    </>
  );
};

export default Home;
