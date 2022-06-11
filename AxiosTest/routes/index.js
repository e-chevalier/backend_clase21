import { axiostest } from "../components/axiostest/index.js"

export const serverRoutes = ( app ) => {
    axiostest(app)
 
    app.get("/", (req, res, next) => {
        res.json({res: "Todo ok"})
    })
    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })
}