"use client"

import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible"
import { ChevronDownIcon, TrashIcon } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { formSchema } from "@/lib/forms/new_quest"
import { blocks, entities, items } from "@/lib/minecraft/minecraft-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox"

interface ObjectiveProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  field: any
  index: number
}

export default function Objective({ form, field, index }: ObjectiveProps) {
  function removeObjective() {
    const objectives = form.getValues("objectives")
    const rewards = form.getValues("rewards")
    objectives.splice(index, 1)
    rewards.splice(index, 1)
    form.setValue("objectives", objectives)
    form.setValue("rewards", rewards)
  }

  const [showThis, setShowThis] = useState<boolean>(true)
  const [requirements, setRequirements] = useState<boolean>(false)
  const [rewards, setRewards] = useState<boolean>(false)

  const [requireMainHand, setRequireMainHand] = useState<boolean | undefined>(
    form.getValues(`objectives.${index}.require_main_hand`)
  )
  const [requireLocation, setRequireLocation] = useState<boolean | undefined>(
    form.getValues(`objectives.${index}.require_location`)
  )
  const [requireTimeLimit, setRequireTimeLimit] = useState<boolean | undefined>(
    form.getValues(`objectives.${index}.require_time_limit`)
  )

  const [shouldHideRewardItem, setShouldHideRewardItem] = useState(
    form.getValues(`rewards.${index}.type`) === "balance"
  )

  return (
    <FormField
      control={form.control}
      name={`objectives.${index}`}
      render={() => (
        <>
          <Collapsible
            open={showThis}
            onOpenChange={setShowThis}
            key={field.id}
          >
            <div className="flex items-center justify-between space-x-4 mt-6">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl md:text-2xl">Objective #{index + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeObjective()}
                >
                  <TrashIcon size="12" />
                </Button>
              </div>

              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon
                    size="12"
                    className={cn({ "rotate-180": showThis }, "transition-all")}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="flex w-full justify-stretch gap-4">
                {/* Objective Type */}
                <FormField
                  control={form.control}
                  name={`objectives.${index}.type`}
                  render={({ field }) => (
                    <>
                      <FormItem className="my-4 flex-1">
                        <FormLabel>
                          <p>Type</p>
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an objective type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kill">Kill</SelectItem>
                              <SelectItem value="mine">Mine</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Feeling murderous or chill mining?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                {/* Objective Amount */}
                <FormField
                  control={form.control}
                  name={`objectives.${index}.amount`}
                  render={({ field }) => (
                    <>
                      <FormItem className="my-4 flex-1">
                        <FormLabel>
                          <p>Amount</p>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          How much to kill? Mine?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>

              {/* Objective Item */}
              <FormField
                control={form.control}
                name={`objectives.${index}.mob_block`}
                render={() => (
                  <>
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        <p>
                          {form.getValues(`objectives.${index}.type`) === "mine"
                            ? "Block"
                            : "Entity"}
                        </p>
                      </FormLabel>
                      <VirtualizedCombobox
                        options={
                          form.getValues(`objectives.${index}.type`) === "mine"
                            ? blocks
                            : entities
                        }
                        searchPlaceholder={`Search ${form.getValues(`objectives.${index}.type`) === "mine"
                          ? "block"
                          : "entity"
                          }...`}
                        onOptionSelect={(value: string) => {
                          form.setValue(`objectives.${index}.mob_block`, value)
                        }}
                        preselect={form.getValues(`objectives.${index}.mob_block`)}
                      />
                      <FormDescription>What to kill? Mine?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              {/* Requirements */}
              <Collapsible
                open={requirements}
                onOpenChange={setRequirements}
                className="mt-4"
              >
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <h3 className="text-xl md:text-2xl">Requirements</h3>
                    <p className="text-sm">
                      Only fill in the requirements you want, and leave anything
                      else blank!
                    </p>
                  </div>

                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDownIcon
                        size="12"
                        className={cn(
                          { "rotate-180": requirements },
                          "transition-all"
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  {/* Objective Mainhand */}
                  <h4 className="text-base mt-4">Main Hand</h4>
                  <FormField
                    control={form.control}
                    name={`objectives.${index}.require_main_hand`}
                    render={({ field }) => (
                      <>
                        <FormItem className="flex flex-row items-center justify-between my-2 border rounded-md p-3 shadow-sm">
                          <FormLabel>Require Main Hand Item</FormLabel>
                          <FormControl>
                            <Switch
                              className="!m-0"
                              checked={field.value}
                              onCheckedChange={(val) => {
                                setRequireMainHand(val)
                                field.onChange(val)
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`objectives.${index}.main_hand`}
                    render={() => (
                      <>
                        <FormItem
                          className={cn(
                            { "!hidden": !requireMainHand },
                            "flex",
                            "flex-col"
                          )}
                        >
                          <VirtualizedCombobox
                            options={items}
                            searchPlaceholder="Search mainhand item..."
                            onOptionSelect={(value: string) => {
                              form.setValue(
                                `objectives.${index}.main_hand`,
                                value
                              )
                            }}
                            preselect={form.getValues(`objectives.${index}.main_hand`)}
                          />

                          <FormDescription>
                            Just bare hands? A wooden pick?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  {/* Location */}
                  <h4 className="text-base mt-2">Location</h4>
                  <FormField
                    control={form.control}
                    name={`objectives.${index}.require_location`}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex flex-row items-center justify-between my-2 border rounded-lg p-3 shadow-sm">
                            <FormLabel>Require Location</FormLabel>
                            <FormControl>
                              <Switch
                                className="!m-0"
                                checked={field.value}
                                onCheckedChange={(val) => {
                                  setRequireLocation(val)
                                  field.onChange(val)
                                }}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <div
                    className={cn(
                      { "!hidden": !requireLocation },
                      "flex w-full justify-stretch gap-4"
                    )}
                  >
                    {/* Objective X */}
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.location_x`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex-1">
                            <FormLabel>X</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />

                    {/* Objective Z */}
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.location_z`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex-1">
                            <FormLabel>Z</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />

                    {/* Objective Radius */}
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.radius`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex-1">
                            <FormLabel>Radius</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="100"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Radius, defaults to 100
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>

                  <h4 className="text-base mt-2">Time Limit</h4>
                  <FormField
                    control={form.control}
                    name={`objectives.${index}.require_time_limit`}
                    render={({ field }) => (
                      <>
                        <FormItem className="flex flex-row items-center justify-between my-2 border rounded-md p-3 shadow-sm">
                          <FormLabel>Require Time Limit</FormLabel>
                          <FormControl>
                            <Switch
                              className="!m-0"
                              checked={field.value}
                              onCheckedChange={(val) => {
                                setRequireTimeLimit(val)
                                field.onChange(val)
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      </>
                    )}
                  />
                  <div
                    className={cn(
                      { "!hidden": !requireTimeLimit },
                      "flex w-full justify-stretch gap-4"
                    )}
                  >
                    {/* Objective Time H */}
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.time_limit.hours`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex-1">
                            <FormLabel>Hours</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />

                    {/* Objective Time Min */}
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.time_limit.min`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex-1">
                            <FormLabel>Minutes</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />

                    {/* Objective Time Sec */}
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.time_limit.sec`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex-1">
                            <FormLabel>Seconds</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <FormField
                control={form.control}
                name={`rewards.${index}`}
                render={() => (
                  <Collapsible
                    open={rewards}
                    onOpenChange={setRewards}
                    className="mt-4"
                  >
                    <div className="flex items-center justify-between space-x-4">
                      <div>
                        <h3 className="text-xl md:text-2xl">Reward</h3>
                      </div>

                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDownIcon
                            size="12"
                            className={cn(
                              { "rotate-180": rewards },
                              "transition-all"
                            )}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                      {/* Step 4: Rewards */}

                      <div className="flex w-full justify-stretch gap-4">
                        {/* Objective Reward Type */}
                        <FormField
                          control={form.control}
                          name={`rewards.${index}.type`}
                          render={({ field }) => (
                            <>
                              <FormItem className="my-4 flex-1">
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(val) => {
                                      setShouldHideRewardItem(val === "balance")
                                      field.onChange(val)
                                    }}
                                    {...field}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a reward type..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="balance">
                                        Balance
                                      </SelectItem>
                                      <SelectItem value="item">Item</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormDescription>
                                  What you giving to the people?
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />

                        {/* Objective Reward Amount */}
                        <FormField
                          control={form.control}
                          name={`rewards.${index}.amount`}
                          render={({ field }) => (
                            <>
                              <FormItem className="my-4 flex-1">
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Feeling generous?
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />
                      </div>

                      {/* Objective Reward Item */}
                      <div className={cn({ hidden: shouldHideRewardItem })}>
                        <FormField
                          control={form.control}
                          name={`rewards.${index}.item`}
                          render={() => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Item</FormLabel>
                              <VirtualizedCombobox
                                options={items}
                                searchPlaceholder="Search item..."
                                onOptionSelect={(value: string) => {
                                  form.setValue(`rewards.${index}.item`, value)
                                }}
                                preselect={form.getValues(`rewards.${index}.item`)}
                              />
                              <FormDescription>
                                The minecraft: prefix will be auto included for
                                you!
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              />
            </CollapsibleContent>
          </Collapsible>
          <FormMessage />
        </>
      )}
    />
  )
}
