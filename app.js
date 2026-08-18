const express = require("express");
const app = express();

function findMean(nums) {
    const total = nums.reduce((sum, num) => sum + num);

    return total / nums.length;

}

function findMedian(nums) {
    nums.sort((a, b) => a - b);

    const middle = Math.floor(nums.length / 2);

    if (nums.length % 2 === 0) {
        return (nums[middle - 1] + nums[middle]) / 2;
    }

    return nums[middle];
}

function findMode(nums) {
    const frequencies = {};

    let mode;
    let highestCount = 0;

    for (const num of nums) {
        frequencies[num] = (frequencies[num] || 0) + 1;

        if (frequencies[num] > highestCount) {
            highestCount = frequencies[num];
            mode = num;
        }
    }

    return mode;
}

function convertAndValidateNums(numsString) {
    if (!numsString) {
        return {
            error: "nums are required"
        };
    }

    const numsAsStrings = numsString.split(",");

    const invalid = numsAsStrings.find(
        num => Number.isNaN(Number(num))
    );

    if (invalid) {
        return {
            error: `${invalid} is not a number`
        };
    }

    return {
        nums: numsAsStrings.map(Number)
    };
}

app.get("/mean", (req, res) => {
    const result = convertAndValidateNums(req.query.nums);

    if (result.error) {
        return res.status(400).json({
            error: result.error
        });
    }

    const mean = findMean(result.nums);

    return res.json({
        operation: "mean",
        value: mean
    });
});

app.get("/median", (req, res) => {
    const result = convertAndValidateNums(req.query.nums);

    if (result.error) {
        return res.status(400).json({
            error: result.error
        });
    }

    const median = findMedian(result.nums);

    return res.json({
        operation: "median",
        value: median
    });
});

app.get("/mode", (req, res) => {
    const result = convertAndValidateNums(req.query.nums);

    if (result.error) {
        return res.status(400).json({
            error: result.error
        });
    }

    const mode = findMode(result.nums);

    return res.json({
        operation: "mode",
        value: mode
    });
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
});