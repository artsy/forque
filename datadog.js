if (process.env.DD_APM_ENABLED) {
  const tracer = require('dd-trace').init({
    hostname: process.env.DD_TRACE_AGENT_HOSTNAME,
    service: "forque",
  })

  tracer.use("http", {
    service: "forque.http-client",
  })
}
