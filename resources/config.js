import agent from "supertest"

export const config = () => {
    return {
        baseUrl: "https://agilizei.serverest.dev"
    }       
}

export const request = () => {
    return agent(config().baseUrl)
}