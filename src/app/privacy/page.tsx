import {Separator} from "@/components/ui/separator";


export default function Privacy() {
    return (
        <div className={'mx-5 grid items-center gap-6 pb-8 pt-6 md:mx-10 md:py-10 xl:mx-20'}>
            <h2>Privacy Policy</h2>
            <p>
                This Privacy Policy describes how Everthorn collects, uses, and manages data across the Website, Minecraft Server,
                and Discord services.
            </p>
            <hr/>

            <h2>Website</h2>
            <p>
                <strong>Cookies:</strong> The website uses cookies to store session information when you log in. These cookies
                are stored solely on your device and are not shared or used for any other purpose.
            </p>
            <p>
                <strong>Discord Sign-In:</strong> You can sign in using Discord to access website features, such as editing wiki
                pages. For admins, signing in also provides access to admin-only sections. You can log out of Discord at any time.
            </p>
            <hr/>

            <h2>Discord</h2>
            <p>
                <strong>Data Collection:</strong> When you join our Discord server, we collect the following information:
                <ul className={'list-inside list-disc pb-2 indent-10'}>
                    <li>Join date</li>
                    <li>Discord ID</li>
                    <li>PSN/Xbox Live Gamertag</li>
                    <li>Chat levels and experience points (XP)</li>
                </ul>
                This data is used to identify you across our services, such as assigning ownership of wiki pages on the Website
                or for logging purposes on the Minecraft Server. Your Gamertag is specifically used for whitelisting purposes.
            </p>
            <p>
                <strong>Optional Data:</strong> You may provide additional information, such as your birthdate or details in the
                "About Me" section. This information is optional and can be updated or removed by you at any time while you are
                a member of the Everthorn Discord server.
            </p>
            <hr/>

            <h2>Minecraft Server</h2>
            <p>
                <strong>Data Collection:</strong> While playing on the Everthorn Minecraft server, we collect the following data:
                <ul className={'list-inside list-disc pb-2 indent-10'}>
                    <li>Start and end times of your play sessions</li>
                    <li>Blocks broken</li>
                    <li>Monsters killed</li>
                    <li>Blocks placed</li>
                    <li>Containers accessed</li>
                </ul>
                This data is used to generate server-wide activity metrics, ensure server security, and support gameplay features
                like "Quests." For example, quests may require players to complete tasks (e.g., mining 50 dirt blocks) in exchange
                for in-game rewards.
            </p>
            <hr/>

            <h2>Data Retention and Deletion</h2>
            <p>
                Upon leaving the Discord server, your data will no longer be accessible through our APIs, and you will be removed
                from the Minecraft Server whitelist. However, aggregated metrics, such as playtime and blocks broken, will remain
                in server-wide statistics in an anonymized format.
            </p>
            <p>
                If you wish to delete your data, you can contact us via Discord (<code>@protocolpav</code>) or email
                (<a href="mailto:everthornbusiness@gmail.com">everthornbusiness@gmail.com</a>). Your personal data (e.g., Discord
                ID,
                join date) will be permanently removed. Metrics associated with your account will be unlinked and reassigned to
                an anonymous user to maintain accurate server statistics.
            </p>
            <hr/>

            <h2>Contact Us</h2>
            <p>
                If you have any questions or requests related to your data, you can reach out to us via:
                <ul className={'list-inside list-disc pb-2 indent-10'}>
                    <li>Discord: <code>@protocolpav</code></li>
                    <li>Email: <a href="mailto:everthornbusiness@gmail.com">everthornbusiness@gmail.com</a></li>
                </ul>
            </p>
        </div>
    )
}