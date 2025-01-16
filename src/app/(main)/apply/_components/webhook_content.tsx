export default function webhook_content(values: any) {
    return JSON.stringify({
        content: "<@&864915135297617922 New application rolled in. " +
            "If you like it, send them a friend request. " +
            "React with :saluting_face: if you have sent a friend request.\n\n" +
            "> Refferals can be either `friends`, `recruitment_post`, `website` (Means they randomly found the website), `other` or null",
        embeds: [
            {
                title: "Application from Everthorn.net",
                color: 15258703,
                fields: [
                    {
                        name: "General Info",
                        value: `**Discord:** \`\@${values.username}\`\n` +
                                `**Age:** ||${values.age}||\n` +
                                `**Activity:** ${values.hours}\n` +
                                `**Refferal:** \`${values.heard_from ? values.heard_from : "other"}\``,
                        inline: false
                    },
                    {
                        name: "What interests you most about Minecraft?",
                        value: values.interests,
                        inline: false
                    },
                    {
                        name: "Give us a short description about yourself",
                        value: values.description,
                        inline: false
                    },
                    {
                        name: "Is there anything else we should know?",
                        value: values.other ? values.other : "`[Empty]`",
                        inline: false
                    }
                ]
            }
        ]
    })
}