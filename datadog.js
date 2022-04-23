// This module is preloaded by node in the package.json start script as datadog 
// must be instantiated before any other instrumented module.
// See: https://github.com/artsy/forque/pull/101

if (process.env.DATATDOG_APM_ENABLED) {
  const tracer = require('dd-trace').init({
    hostname: process.env.DATADOG_TRACE_AGENT_HOSTNAME,
    service: "forque",
  })

  tracer.use("http", {
    service: "forque.http-client",
  })
}
