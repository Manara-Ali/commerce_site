const express = require("express");

const router = express.Router({mergeParams: true});

router.route("/").get((req, res, next) => {
    res.status(200).json({
        status: "success",
        results: "all reviews",
        data: {
            message: "All Reviews"
        }
    })
});

module.exports = router;