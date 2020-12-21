const Calling = require('../models/calling');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const CallingController = () => {
    const call_by_length = async (req, res) => {
        const sdate = req.body.sdate;
        const edate = req.body.edate;
        try {
            let five_condition = { duration:{[Op.lte]:300},created_at:{
                    [Op.between]: [sdate, edate]}}
            let ten_condition = {duration:{[Op.and]: {[Op.gte]: 301, [Op.lte]: 600}},created_at:{
                [Op.between]: [sdate, edate]}}

            let fifteen_condition = {duration:{[Op.and]: {[Op.gte]: 601, [Op.lte]: 900}},created_at:{
                    [Op.between]: [sdate, edate]}}

            let thirty_condition = {duration:{[Op.and]: {[Op.gte]: 901, [Op.lte]: 1800}},created_at:{
                    [Op.between]: [sdate, edate]}}

            let sixty_condition = {duration:{[Op.and]: {[Op.gte]: 1801, [Op.lte]: 3600}},created_at:{
                    [Op.between]: [sdate, edate]}}

            // const c_five = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('duration')), 'call_five']], where: five_condition,raw : true});

            // console.log(condition)

            let condition = [{name:'5 mins',con:five_condition}, {name:'10 mins',con:ten_condition}, {name:'15 mins',con:fifteen_condition},
                                {name:'30 mins',con:thirty_condition}, {name:'60 mins',con:sixty_condition}]


            var res_obj = {}
            var res_arr = []
            var prop = ['five','ten','fifteen','thirty','sixty']

            for(var i = 0; i < condition.length; i++) {
                // console.log(condition[i].name);
                // console.log(condition[i].value);
                // console.log(Object.keys(condition[i]))
                const c_var = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('duration')), condition[i].name]], where: condition[i].con,raw : true});
                // Object.assign(results, c_five[0])
                var vl_float = parseFloat(c_var[0][condition[i].name])
                var d_silent = vl_float.toFixed(0);

                var duration_silent = parseInt(d_silent)
                if (isNaN(duration_silent)) {
                    duration_silent = 0;
                }
                // console.log(duration_silent)
                // console.log(condition[i].name)
                // console.log(duration_silent)

                Object.assign(res_obj, {name:condition[i].name, value:duration_silent});
                res_arr.push({name:condition[i].name, value:duration_silent})
                // console.log(res_obj)
            }
            console.log(res_arr)
            return res.status(200).json({
                status: 200,
                data:res_arr
            })
        }catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }

    }
    const group_calling = async (req, res) => {
        const sdate = req.body.sdate;
        const edate = req.body.edate;
        try {
            let count_silent_condition = { total_speech_duration:0,created_at:{
                    [Op.between]: [sdate, edate]}}

            const s_count = await Calling.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('total_speech_duration')), 'silent_calls']], where: count_silent_condition,raw : true});

            const silent_count = s_count[0].silent_calls

            let duration_silent_condition = { total_speech_duration:0,created_at:{
                    [Op.between]: [sdate, edate]}}

            const sum_silent = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('duration')), 'duration_silent']], where: duration_silent_condition,raw : true});
            var duration_float = parseFloat(sum_silent[0].duration_silent)

            var d_silent = duration_float.toFixed(0);

            var duration_silent = parseInt(d_silent)

            let count_overtime_condition = { duration:{[Op.gt]:900},created_at:{
                    [Op.between]: [sdate, edate]}}

            const c_overtime = await Calling.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('duration')), 'overtime_calls']], where: count_overtime_condition,raw : true});

            const count_overtime = c_overtime[0].overtime_calls

            let duration_overtime_condition = { duration:{[Op.gt]:900},created_at:{
                    [Op.between]: [sdate, edate]}}

            const sum_overtime = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('duration')), 'overtime_calls']], where: duration_overtime_condition,raw : true});

            var d_overtime = parseFloat(sum_overtime[0].overtime_calls)

            var d_overtime_string = d_overtime.toFixed(0);
            var duration_overtime = parseInt(d_overtime_string)

            var results = {count_silent:silent_count,
                duration_silent:duration_silent,
                count_overtime:count_overtime,
                duration_overtime:duration_overtime}

            return res.status(200).json({
                status: 200,
                data:results

            })


        }catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }
    }

    const ethical = async (req, res) => {
        const sdate = req.body.sdate;
        const edate = req.body.edate;
        try {
            let speed_call_condition = { created_at:{[Op.between]: [sdate, edate]}}

            const sum_speed = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('speaking_speed')), 'speed_calls']], where: speed_call_condition, raw : true});
            var c_speed = parseFloat(sum_speed[0].speed_calls)
            var c_speed_string = c_speed.toFixed(0);
            var speed_calls = parseInt(c_speed_string)

            const sum_amp = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('sample_max_value')), 'max_value']], where: speed_call_condition, raw : true});

            var s_amp = parseFloat(sum_amp[0].max_value)
            var s_amp_string = s_amp.toFixed(0);
            var summary_amplitude = parseInt(s_amp_string)

            var results = {speed_calls:speed_calls, summary_amplitude:summary_amplitude }

            return res.status(200).json({
                status: 200,
                data:results
            })

        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: {},
                message: "Error: " + err
            });
        }

    }

    // const count_silent_calls = async (req, res) => {
    //     const sdate = req.body.sdate;
    //     const edate = req.body.edate;
    //     try {
    //         let condition = { total_speech_duration:0,created_at:{
    //                             [Op.between]: [sdate, edate]}}
    //
    //         const count = await Calling.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('total_speech_duration')), 'silent_calls']], where: condition,raw : true});
    //         return res.status(200).json({
    //             status: 200,
    //             count_silent:count[0].silent_calls
    //
    //         })
    //
    //     } catch (err) {
    //         return res.status(200).json({
    //             status: 500,
    //             data: [],
    //             message: "Error: " + err
    //         });
    //     }
    // }

    // const duration_silent_calls = async (req, res) => {
    //     const sdate = req.body.sdate;
    //     const edate = req.body.edate;
    //
    //     try {
    //         let condition = { total_speech_duration:0,created_at:{
    //                 [Op.between]: [sdate, edate]}}
    //
    //         const sum_silent = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('duration')), 'duration_silent']], where: condition,raw : true});
    //         var duration_float = parseFloat(sum_silent[0].duration_silent)
    //
    //         var duration_silent = duration_float.toFixed(0);
    //
    //         return res.status(200).json({duration_silent:parseInt(duration_silent)
    //
    //         })
    //
    //     } catch (err) {
    //         return res.status(200).json({
    //             status: 500,
    //             data: [],
    //             message: "Error: " + err
    //         });
    //     }
    //
    // }

    // const count_overtime_calls = async (req, res) => {
    //     const sdate = req.body.sdate;
    //     const edate = req.body.edate;
    //     try {
    //         let condition = { duration:{[Op.gt]:900},created_at:{
    //                 [Op.between]: [sdate, edate]}}
    //
    //         const count = await Calling.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('duration')), 'overtime_calls']], where: condition,raw : true});
    //         return res.status(200).json({
    //             count_overtime:count[0].overtime_calls
    //
    //         })
    //
    //     } catch (err) {
    //         return res.status(200).json({
    //             status: 500,
    //             data: [],
    //             message: "Error: " + err
    //         });
    //     }
    // }

    // const duration_overtime_calls = async (req, res) => {
    //     const sdate = req.body.sdate;
    //     const edate = req.body.edate;
    //     try {
    //         let condition = { duration:{[Op.gt]:900},created_at:{
    //                 [Op.between]: [sdate, edate]}}
    //
    //         const sum_overtime = await Calling.findAll({attributes: [[Sequelize.fn('SUM', Sequelize.col('duration')), 'overtime_calls']], where: condition,raw : true});
    //
    //         var duration_float = parseFloat(sum_overtime[0].overtime_calls)
    //
    //         var duration_overtime = duration_float.toFixed(0);
    //         return res.status(200).json({
    //             duration_overtime:parseInt(duration_overtime)
    //
    //         })
    //
    //     } catch (err) {
    //         return res.status(200).json({
    //             status: 500,
    //             data: [],
    //             message: "Error: " + err
    //         });
    //     }
    // }
    return {group_calling, ethical, call_by_length}
}

module.exports = CallingController;
