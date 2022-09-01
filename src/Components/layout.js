import React from "react";
import {Box, IconButton, Tooltip} from "@chakra-ui/react";
import {EmailIcon, LinkIcon,} from "@chakra-ui/icons";
import {FaGithub,} from "react-icons/fa";

const RouteChange = (opt) => {
    let GithubPage = "https://github.com/sysu-software-2022/DS3P.git";
    let Email = "mailto:sysu_software2022@163.com";
    let University_home_page = "https://www.sysu.edu.cn";
    if (opt === "github") {
        window.open(GithubPage, "_blank", "noopener,noreferrer");
    } else if (opt === "email") {
        window.open(Email, "_blank", "noopener,noreferrer");
    } else if (opt === "uiversity_home_page") {
        window.open(University_home_page, "_blank", "noopener,noreferrer");
    }
};


export default function Layout(props) {
    return (
        <Box display='flex' justifyItems='center'>
            <Tooltip label="Github" placement="auto-start">
                <IconButton
                    colorScheme="tail"
                    icon={<FaGithub/>}
                    marginRight="5px"
                    variant="ghost"
                    onClick={() => RouteChange("github")}
                />
            </Tooltip>

            <Tooltip label="Email" placement="auto-start">
                <IconButton
                    colorScheme="tail"
                    icon={<EmailIcon/>}
                    marginRight="5px"
                    variant="ghost"
                    onClick={() => RouteChange("email")}
                />
            </Tooltip>

            <Tooltip label="Sun Yat-sen University Home Page" placement="auto-start">
                <IconButton
                    colorScheme="tail"
                    icon={<LinkIcon/>}
                    marginRight="5px"
                    variant="ghost"
                    onClick={() => RouteChange("uiversity_home_page")}
                />
            </Tooltip>

        </Box>

    );
};


