"use client"

import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface ObjectiveProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  field: any
  index: number
  length: number
  create_new: Function
}

export default function Objective({ form, field, index, length, create_new }: ObjectiveProps) {
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
  const [rewards, setRewards] = useState<boolean>(true)

  const [requireNaturalBlock, setNaturalBlock] = useState<boolean | undefined>(
    form.getValues(`objectives.${index}.require_natural_block`)
  )
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
    form.getValues(`rewards.${index}.type`) === "balance" || form.getValues(`rewards.${index}.type`) == null
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
              <CollapsibleTrigger asChild>
                <Button variant='invisible' size='sm' className="items-start m-0 p-0">
                  <FormLabel className="text-xl md:text-2xl hover:font-extrabold font-semibold hover:cursor-pointer">Objective {index + 1}</FormLabel>
                </Button>
              </CollapsibleTrigger>

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

              {/* Objective Description */}
              <div className="mt-7">
                <FormField
                  control={form.control}
                  name={`objectives.${index}.description`}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>
                          <h4 className='text-base'>Description</h4>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                          placeholder="Hey! Me name's old man geeza. I've lost my gems. They took the map too! Go kill the zombie hoard and return my map to start the journey..."
                          {...field}
                        ></Textarea>
                        </FormControl>
                        <FormDescription>
                          This is the story behind the quest. As people complete objectives, reveal more of the story via objective descriptions!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                  />
              </div>

              {/* Objective Type */}
              <div className="flex w-full justify-stretch gap-4">
                <FormField
                  control={form.control}
                  name={`objectives.${index}.type`}
                  render={({ field }) => (
                    <>
                      <FormItem className="my-4 flex-1">
                        <FormLabel>
                          <h4 className="text-base">Type</h4>
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={(val) => {
                                  field.onChange(val)
                                }}
                                {...field}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an objective type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kill">Kill</SelectItem>
                              <SelectItem value="mine">Mine</SelectItem>
                              <SelectItem value="encounter">Custom Encounter</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
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
                          <h4 className='text-base'>Amount</h4>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>

              {/* Objective Item */}
              <div className={cn({ hidden: form.getValues(`objectives.${index}.type`) == null || form.getValues(`objectives.${index}.type`) === 'encounter' })}>
                <FormField
                  control={form.control}
                  name={`objectives.${index}.mob_block`}
                  render={({field}) => (
                    <>
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          <h4 className='text-base'>
                            {form.getValues(`objectives.${index}.type`) === "mine"
                              ? "Block"
                              : "Entity"
                            }
                          </h4>
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
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>

              {/* Custom Encounter Fields */}
              <div className={cn({ hidden: form.getValues(`objectives.${index}.type`) !== 'encounter' })}>
                <FormField
                  control={form.control}
                  name={`objectives.${index}.script_id`}
                  render={({field}) => (
                    <FormItem className="flex flex-col">
                      <FormLabel><h4 className='text-base'>Script Event ID</h4></FormLabel>
                      <FormControl>
                          <Input placeholder="quest:your_custom_id" {...field}></Input>
                      </FormControl>
                      <FormDescription>
                      Custom Encounters use the /scriptevent command, requiring an ID you create.
                      The addon increments the objective each time it detects this ID until the target amount is reached.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`objectives.${index}.display`}
                  render={({field}) => (
                    <FormItem className="flex flex-col">
                      <FormLabel><h4 className='text-base'>Task Display</h4></FormLabel>
                      <FormControl>
                          <Input placeholder="Speak to the Butcher" {...field}></Input>
                      </FormControl>
                      <FormDescription>
                      Encounters are all different, this is why you choose the task that displays for people.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <Separator className="my-5"/>

              {/* Requirements */}
              <Collapsible
                open={requirements}
                onOpenChange={setRequirements}
              >
                <div className="flex items-center justify-between space-x-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="invisible" size="sm" className="items-start m-0 p-0">
                      <h3 className="text-xl md:text-2xl hover:font-bold">Requirements</h3>
                    </Button>
                  </CollapsibleTrigger>

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
                  {/* Objective Natural Block */}
                  <div className={cn({ hidden: form.getValues(`objectives.${index}.type`) !== "mine" })}>
                    <h4 className="text-base mt-4">Natural Blocks</h4>
                    <div className="border rounded-md p-3 shadow-sm my-2 ">
                      <FormField
                        control={form.control}
                        name={`objectives.${index}.require_natural_block`}
                        render={({ field }) => (
                          <>
                            <FormItem className="flex flex-row items-center justify-between">
                              <FormLabel>Require Blocks Mined To Be Natural</FormLabel>
                              <FormControl>
                                <Switch
                                  className="!m-0"
                                  checked={field.value}
                                  onCheckedChange={(val) => {
                                    setNaturalBlock(val)
                                    field.onChange(val)
                                  }}
                                />
                              </FormControl>
                            </FormItem>

                            <FormDescription className="text-sm md:w-5/6">
                                Note: Blocks mined will take 1-2 seconds to be processed if enabled
                            </FormDescription>
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* Mainhand */}
                  <h4 className="text-base mt-4">Main Hand</h4>
                  <div className="border rounded-md p-3 shadow-sm my-2 ">
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.require_main_hand`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex flex-row items-center justify-between">
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
                              "flex-col",
                              "mt-4"
                            )}
                          >
                            <VirtualizedCombobox
                              options={items}
                              searchPlaceholder="Select mainhand item..."
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
                  </div>

                  {/* Location */}
                  <h4 className="text-base mt-2">Location</h4>
                  <div className="border rounded-md p-3 shadow-sm my-2 ">
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.require_location`}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <div className="flex flex-row items-center justify-between">
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
                        "flex w-full justify-stretch gap-4 mt-4"
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
                              <FormMessage />
                            </FormItem>
                          </>
                        )}
                      />
                    </div>
                  </div>

                  {/* Time Limit */}
                  <h4 className="text-base mt-2">Time Limit</h4>
                  <div className="border rounded-md p-3 shadow-sm my-2 ">
                    <FormField
                      control={form.control}
                      name={`objectives.${index}.require_time_limit`}
                      render={({ field }) => (
                        <>
                          <FormItem className="flex flex-row items-center justify-between">
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
                        "flex w-full justify-stretch gap-4 mt-4"
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
                  </div>

                </CollapsibleContent>
              </Collapsible>

              <Separator className="my-5"/>

              {/* Rewards */}
              <Collapsible
                    open={rewards}
                    onOpenChange={setRewards}
                  >
                <FormField
                  control={form.control}
                  name={`rewards.${index}`}
                  render={() => (
                    <>
                      <div className="flex items-center justify-between space-x-4">
                        <CollapsibleTrigger asChild>
                          <Button variant="invisible" size="sm" className="items-start m-0 p-0">
                            <h3 className="text-xl md:text-2xl hover:font-bold">Reward</h3>
                          </Button>
                        </CollapsibleTrigger>

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
                        {/* Objective Reward Display Name */}
                        <div className="pt-4">
                          <FormField
                            control={form.control}
                            name={`rewards.${index}.display_name`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel><h4 className='text-base'>Display Name</h4></FormLabel>
                                <FormControl>
                                  <Input placeholder="Something Shiny" {...field}></Input>
                                </FormControl>
                                <FormDescription>
                                  If you want people to see this reward as something else, fill this in. Otherwise leave blank.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Objective Reward Type */}
                        <div className="flex w-full justify-stretch gap-4">
                          <FormField
                            control={form.control}
                            name={`rewards.${index}.type`}
                            render={({ field }) => (
                              <>
                                <FormItem className="my-4 flex-auto w-2/3">
                                  <FormLabel><h4 className='text-base'>Type</h4></FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={(val) => {
                                        setShouldHideRewardItem(val === "balance")
                                        field.onChange(val)
                                      }}
                                      {...field}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select reward type..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="balance">Balance</SelectItem>
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
                                <FormItem className="my-4 flex-auto w-1/3">
                                  <FormLabel><h4 className='text-base'>Amount</h4></FormLabel>
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
                                <FormLabel><h4 className='text-base'>Item</h4></FormLabel>
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
                    </>
                  )}
                />
              </Collapsible>

            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2"/>

          <div className="flex justify-start gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {create_new(); setShowThis(false)}}
              className={cn({hidden: index+1 < length}, "mt-2")}
            >
              Add Next Objective
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeObjective()}
              className="mt-2"
            >
              Delete
            </Button>
          </div>
        </>
      )}
    />
  )
}
