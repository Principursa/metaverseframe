import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { DEBUG_HUB_OPTIONS } from "./debug/constants";
import data from "./propydata.json"
type State = {
  playerwidth: number;
  playerheight: number;
  active: boolean;
};

interface Action {
  type: 'incrementwidth' | 'decrementwidth' | 'incrementheight' | 'drecementheight';

  
}

let length = 10
let height = 10
let gameMap  = Array(height).fill(0).map(() => Array(length).fill(0));
let initPlayerHeight = height/2
let initPlayerWidth = length/2

gameMap[height/2][length/2] = 1


let coords = [[3,7],[10,2],[1,4],[4,10],[5,1]]


const initialState = { active: false, total_button_presses: 0,playerwidth:initPlayerWidth,playerheight:initPlayerHeight};

const reducer: FrameReducer<State> = (state, action) => ({

  playerwidth: state.playerwidth + 1,
  playerheight: state.playerheight + 1,
  active: true

});

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  console.log("info: state is:", state);

  if (frameMessage) {
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterCustodyAddress,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage;

    console.log("info: frameMessage is:", frameMessage);
  }

  const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={`/debug?url=${baseUrl}`} className="underline">
        Debug
      </Link>
      <FrameContainer
        postUrl="/frames"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {/* <FrameImage src="https://framesjs.org/og.png" /> */}
        <FrameImage aspectRatio="1.91:1">
          <div tw="flex flex-row">
            {GameState(state)}
            </div>

        </FrameImage>
        <FrameButton onClick={dispatch}>
           ⬅️️️ 
        </FrameButton>
        <FrameButton onClick={dispatch}>
⬆️
        </FrameButton>
        <FrameButton onClick={dispatch}>
          ⬇️
        </FrameButton>
        <FrameButton onClick={dispatch}>
         ️️➡️
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
function moveRight(){

}
function moveLeft(){

}
function moveUp(){

}
function moveDown(){

}

function GameState(state) {
  return(


    <p tw="w-full h-full bg-slate-700 justify-center items-center">
        {gameMap.map((element,index)=> (<tr tw="display-flex flex-col" key={index}>{element.map((val,i) => Tiles(val,i,index,state))}</tr>)) }
        {state?.active == true ? (<div tw="flex flex-col text-white">Hagia Sophia<img tw="w-50 m-10" src={"https://propy.mypinata.cloud/ipfs/QmcgtYmaabgUKPbBVq8GQtABD4AKWbfZjaF1xW4AGzPXLw"} alt="" /></div>): ("")}

            
</p>

  )
}

function Tiles(value: number,width: any,height: number,state) {
  if(width == state.playerwidth && height == state.playerheight){
    return(
    <td id={width} tw="m-.5 relative">🟥<div tw="absolute">🥷</div></td>
    )
  }
  else return <td id={width} tw="m-.5 relative">⬜
  {Building(width,height)}
  </td>
}
function Building(width,height,) {
  if (width == 6 && height == 6){
    return (
<div tw="absolute">🏛️</div>
    )
  }

}