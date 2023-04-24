class CommonController {
    async reject(req, res) {
        res.status(502).json({ error: 'Cannot process request'});
    }
}

export default new CommonController();
