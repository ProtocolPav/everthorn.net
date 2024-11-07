import { z } from "zod"

import { objectiveSchema, rewardSchema } from "@/lib/forms/new_quest"
import { minecraftItemStringToWords } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface confirmObjectivesProps {
  objective: z.infer<typeof objectiveSchema>
  reward: z.infer<typeof rewardSchema>
  index: number
}

export default function ConfirmObjectives({
  objective,
  reward,
  index,
}: confirmObjectivesProps) {
  function getConfirmationObjectiveString(): string {
    let task: string | undefined = ''
    if (objective.mob_block !== undefined) {task = minecraftItemStringToWords(objective.mob_block)}
    else {task = objective.script_id}
    const mainObjective = `${objective.type?.at(0)?.toUpperCase() + objective.type?.slice(1)
      } ${objective.amount} ${task}`

    const mainhand: string = objective.main_hand as string
    const withMainHand =
      objective.require_main_hand && mainhand
        ? ` with ${minecraftItemStringToWords(mainhand)}`
        : ""

    const onLocation =
      objective.require_location &&
        objective.location_x &&
        objective.location_z &&
        objective.radius
        ? ` up to ${objective.radius} blocks from X:${objective.location_x} Z:${objective.location_z}`
        : ""

    const h = Number(objective.time_limit.hours)
    const min = Number(objective.time_limit.min)
    const sec = Number(objective.time_limit.sec)

    const timeLimit = objective.require_time_limit
      ? ` within ${h ? `${h}h` : ""}${min ? `${min}min` : ""}${sec ? `${sec}sec` : ""
      }`
      : ""

    return `${mainObjective}${withMainHand}${onLocation}${timeLimit}.`
  }

  function getConfirmationRewardString(): string {
    const rewardString =
      reward.type === "balance"
        ? "nugs"
        : minecraftItemStringToWords(reward.item as string)

    return `${reward.amount} ${rewardString}.`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objective #{index + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <b>Objective: </b>
          {getConfirmationObjectiveString()}
        </p>

        <p>
          <b>Reward: </b>
          {getConfirmationRewardString()}
        </p>
      </CardContent>
    </Card>
  )
}
