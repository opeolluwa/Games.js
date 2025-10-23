import {createStore, createEvent} from "effector";

const incremented = createEvent();
const decremented = createEvent();

const $score = createStore(0);

$score.on(incremented, (value) => value += 1);
$score.on(decremented, (value) => value -= 1)