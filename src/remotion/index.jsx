import { registerRoot, Composition } from 'remotion'
import ProblemMotion from './ProblemMotion'

const Root = () => (
  <>
    {/* Primary 16:9 composition — main delivery */}
    <Composition
      id="ProblemMotion"
      component={ProblemMotion}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />

    {/* Vertical 9:16 crop — reuses the same component; layout adapts via
        useVideoConfig() inside ProblemMotion. */}
    <Composition
      id="ProblemMotionVertical"
      component={ProblemMotion}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
)

registerRoot(Root)
