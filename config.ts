export default {
    port: process.env.PORT || 4000,
    apollo: {
        apikey: process.env.APOLLO_KEY,
        variant: process.env.APOLLO_GRAPH_VARIANT,
        graphId: process.env.APOLLO_GRAPH_ID,
    },
    api_url: process.env.API_URL || ''
};