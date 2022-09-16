const express = require('express')
const router = express.Router()

// Add lastest routes here:


//*******************************************************************************************************************************************************v10*
///// case selector routes ////
// Start routes for assigning a caseload)
router.post('case-selector/ready-for-review', (req, res, next) => {
     // redirect to "case-manager-assign" page.
   res.redirect('case-selector/case-manager-assign')
 })

// route for assigning cases
router.post('case-selector/case-manager-assign', (req, res, next) => {
       // Checks radio options, if "Add a new caseload" is selected, route to "create-new-case-ready-review" page.
      if (req.session.data['assign-caseload'] == "new-caseload") {
        // redirect to "create-new-case-ready-review" page.
        res.redirect('case-selector/create-new-case-ready-review')
      } else {
        // redirect to "ready-for-review-success" page.
        res.redirect('case-selector/ready-for-review-success')
      }
})

// route for reassigning cases
router.post('case-selector/case-manager-reassign', (req, res, next) => {
       // Checks radio options, if "Add a new caseload" is selected, route to "create-new-case-ready-review" page.
      if (req.session.data['reassign-caseload'] == "new-caseload") {
         // redirect to "create-new-case-ready-review" page.
          res.redirect('case-selector/create-new-case-in-review')

      } else {
        // stores data value from URL so the prototype knows which case has been selected.
        // Case name stored as variable which displays dynamically on success page.
        const reassignedCaseName = req.session.data.source
        // Reads out data into command line. (good for debugging)
        console.log(1, req.session.data)
        res.redirect('case-selector/assigned-for-review-success')
      }
})
// route for creating caseload - ready for review
router.post('case-selector/create-new-case-ready-review', (req, res, next) => {
         // redirect to "create-caseload-success" page.
        res.redirect('case-selector/create-caseload-ready-review-success')
      }
)
// route for creating caseload - in review
router.post('case-selector/create-new-case-in-review', (req, res, next) => {
         // redirect to "create-caseload-success" page.
        res.redirect('case-selector/create-caseload-in-review-success')
      }
)



// Triage route //
router.post('case-selector/ready-to-make-next-step', function (req, res) {

// Make a variable and give it the value from 'how-many-balls'
var makearecommendation = req.session.data['next-step']

// Check whether the variable matches a condition
if (makearecommendation == "Yes, move case to ready for review"){
 // Send user to decision page
 res.redirect('ready-for-review')
} else {
 // Send user to referral page
 res.redirect('refer-confirm')
}

})

// Referral assessment route //

router.post('review/ready-to-make-next-step', function (req, res) {

// Make a variable and give it the value from 'how-many-balls'
var makearecommendation = req.session.data['next-step']

// Check whether the variable matches a condition
if (makearecommendation == "Send case for a decision"){
 // Send user to decision page
 res.redirect('decision')
} else {
 // Send user to referral page
 res.redirect('refer')
}

})
/////////////////////// end case selector routes /////////////
// Referral assessment route //

router.post('case-review/ready-to-make-next-step', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var makearecommendation = req.session.data['next-step']

  // Check whether the variable matches a condition
  if (makearecommendation == "Case is ready for a decision"){
    // Send user to decision page
    res.redirect('decision')
  } else {
    // Send user to referral page
    res.redirect('refer')
  }

})

//Start routes for the 'adding a question' journey (collated questions view)
// this does not work - seperate ones created below
router.post('case-review/question-link', (req, res, next) => {
    if (req.session.data['question-for']) {
      console.log('is-this-calling-questions', req.session.data)
      const questionBox = req.session.data['question']
      const answerBox = req.session.data['answer']
      const answeredQuestion = req.session.data['answered-question']
      const section = req.session.data.source

      const queriesQuestions = req.session.data.queriesQuestions || []
      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
      req.session.data.queriesQuestions = queriesQuestions

      let href;

      switch (req.session.data['question-for']) {
        case("Unassigned"):
        href = 'case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = 'case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = 'case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = 'case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = 'case-review/questions-external-medical-health-professional';
        break;
        //this is the hardcoded bit if one of the links fails
        default:
        href = 'case-review/summary';
      }
      console.log('question-for');
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
      res.redirect('case-review/summary')

      }
    })

//test to create a preparing food question

router.post('case-review/question-preparingfood', (req, res, next) => {
    if (req.session.data['question-for']) {
      console.log('is-this-calling-questions', req.session.data)
      const textBox = req.session.data['question']
      const answerBox = req.session.data['answer']
      const answeredQuestion = req.session.data['answered-question']
      const section = req.session.data.source
      const queriesQuestions = req.session.data.queriesQuestions || ['question-for']
      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
      req.session.data.queriesQuestions = queriesQuestions

      let href;

      switch (req.session.data['question-for']) {
        case("Unassigned"):
        href = 'case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = 'case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = 'case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = 'case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = 'case-review/questions-external-medical-health-professional';
        break;
        //this is the hardcoded bit if one of the links fails
        default:
        href = 'case-review/summary';
      }
      console.log('question-for');
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
      res.redirect('case-review/summary')

      }
    })

    //end test to create preparing food question


//Start routes for the 'adding a question' journey (collated questions view)
    //Adding a question to unassigned questions
    router.post('case-review/question-unassigned-add', (req, res, next) => {
        if (req.session.data['question-for-unassigned']) {
          console.log('is-this-calling-questions', req.session.data)
          const questionBox = req.session.data['question']
          const answerBox = req.session.data['answer']
          const answeredQuestion = req.session.data['answered-question']
          const section = req.session.data.source
          const queriesQuestionsUnassigned = req.session.data.queriesQuestionsUnassigned || ['question-for-unassigned']
          queriesQuestionsUnassigned.push({ answerBox, questionBox, answeredQuestion, section })
          req.session.data.queriesQuestionsUnassigned = queriesQuestionsUnassigned

          let href;

          switch (req.session.data['question-for-unassigned']) {
            case("Unassigned"):
            href = 'case-review/unassigned-questions';
            break;
            case("Claimant"):
            href = 'case-review/questions-claimant';
            break;
            case("Internal medical support"):
            href = 'case-review/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = 'case-review/questions-internal-non-medical-support';
            break;
            case("External health professional"):
            href = 'case-review/questions-external-medical-health-professional';
            break;

          }

          req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].action = req.session.data['question-for-unassigned']
          req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].href = href;
          res.redirect('case-review/unassigned-questions')
          }
        })

//Adding a question to claimant
        router.post('case-review/question-add', (req, res, next) => {
            if (req.session.data['question-for-claimant']) {
              console.log('is-this-calling-questions', req.session.data)
              const questionBox = req.session.data['question']
              const answerBox = req.session.data['answer']
              const answeredQuestion = req.session.data['answered-question']
              const section = req.session.data.source
              const queriesQuestions = req.session.data.queriesQuestions || ['question-for-claimant']
              queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
              req.session.data.queriesQuestions = queriesQuestions

              let href;

              switch (req.session.data['question-for-claimant']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/questions';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for-claimant']
              //req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].answered = answered;
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
              res.redirect('case-review/questions-claimant')
              }
            })





          // Add a question for internal medical support
            router.post('case-review/question-internal-medical-support-add', (req, res, next) => {
                if (req.session.data['question-for-internal-medical-support']) {
                  console.log('is-this-calling-questions', req.session.data)
                  const questionBox = req.session.data['question']
                  const answerBox = req.session.data['answer']
                  const answeredQuestion = req.session.data['answered-question']
                  const section = req.session.data.source

                  const queriesQuestionsMedSupport = req.session.data.queriesQuestionsMedSupport || []
                  queriesQuestionsMedSupport.push({ answerBox, questionBox, answeredQuestion, section })
                  req.session.data.queriesQuestionsMedSupport = queriesQuestionsMedSupport

                  let href;

                  switch (req.session.data['question-for-internal-medical-support']) {
                    case("Unassigned"):
                    href = 'case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = 'case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = 'case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = 'case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = 'case-review/questions-external-medical-health-professional';
                    break;
                    //this is the hardcoded bit if one of the links fails
                    default:
                    href = 'case-review/questions';
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].action = req.session.data['question-for-internal-medical-support']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].href = href;
                  res.redirect('case-review/questions-internal-medical-support')

                  }
                })

                      // Add a question for internal non medical support
                        router.post('case-review/question-internal-non-medical-add', (req, res, next) => {
                            if (req.session.data['question-for-non-medical-support']) {
                              console.log('is-this-calling-questions', req.session.data)
                              const questionBox = req.session.data['question']
                              const answerBox = req.session.data['answer']
                              const answeredQuestion = req.session.data['answered-question']
                              const section = req.session.data.source

                              const queriesQuestionsNonMedical = req.session.data.queriesQuestionsNonMedical || []
                              queriesQuestionsNonMedical.push({ answerBox, questionBox, answeredQuestion, section })
                              req.session.data.queriesQuestionsNonMedical = queriesQuestionsNonMedical

                              let href;

                              switch (req.session.data['question-for-non-medical-support']) {
                                case("Unassigned"):
                                href = 'case-review/unassigned-questions';
                                break;
                                case("Claimant"):
                                href = 'case-review/questions-claimant';
                                break;
                                case("Internal medical support"):
                                href = 'case-review/questions-internal-medical-support';
                                break;
                                case("Internal non medical support"):
                                href = 'case-review/questions-internal-non-medical-support';
                                break;
                                case("External health professional"):
                                href = 'case-review/questions-external-medical-health-professional';
                                break;
                                href = 'case-review/questions';
                              }

                            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].action = req.session.data['question-for-non-medical-support']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].href = href;
                              res.redirect('case-review/questions-internal-non-medical-support')

                              }
                            })


                            // Add a question for external health professional
                              router.post('case-review/question-external-medical-add', (req, res, next) => {
                                  if (req.session.data['question-for-external-health-professional']) {
                                    console.log('is-this-calling-questions', req.session.data)
                                    const questionBox = req.session.data['question']
                                    const answerBox = req.session.data['answer']
                                    const answeredQuestion = req.session.data['answered-question']
                                    const section = req.session.data.source

                                    const queriesQuestionsExternalMedical = req.session.data.queriesQuestionsExternalMedical || []
                                    queriesQuestionsExternalMedical.push({ answerBox, questionBox, answeredQuestion, section })
                                    req.session.data.queriesQuestionsExternalMedical = queriesQuestionsExternalMedical

                                    let href;

                                    switch (req.session.data['question-for-external-health-professional']) {
                                      case("Unassigned"):
                                      href = 'case-review/unassigned-questions';
                                      break;
                                      case("Claimant"):
                                      href = 'case-review/questions-claimant';
                                      break;
                                      case("Internal medical support"):
                                      href = 'case-review/questions-internal-medical-support';
                                      break;
                                      case("Internal non medical support"):
                                      href = 'case-review/questions-internal-non-medical-support';
                                      break;
                                      case("External health professional"):
                                      href = 'case-review/questions-external-medical-health-professional';
                                      break;
                                      //this is the hardcoded bit if one of the links fails
                                      default:
                                      href = 'case-review/questions';
                                    }

                                  //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                                    req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].action = req.session.data['question-for-external-health-professional']
                                    req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].href = href;
                                    res.redirect('case-review/questions-external-medical-health-professional')

                                    }
                                  })


//Start routes for preparing food: questions
router.post('case-review/activities/preparing-food', (req, res, next) => {
    if (req.session.data['who-is-question-for-prepfood']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ textBox, section })
      req.session.data.queriesPrepFood = queriesPrepFood

      let href;

      switch (req.session.data['who-is-question-for-prepfood']) {
        case("Unassigned"):
        href = 'case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = 'case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = 'case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = 'case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = 'case-review/questions-external-medical-health-professional';
        break;
        //this is the hardcoded bit if one of the links fails
        default:
        href = 'case-review/tasklist';
      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['who-is-question-for-prepfood']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
      res.redirect('case-review/activities/preparing-food')
      }
    })


  //Start routes for eating and drinking: questions
    router.post('case-review/activities/taking-nutrition', (req, res, next) => {
        if (req.session.data['who-is-question-for-eating']) {
          console.log('is-this-calling', req.session.data)
          const textBox = req.session.data['query-content']
          const section = req.session.data.source

          const queriesEatDrink = req.session.data.queriesEatDrink || []
          queriesEatDrink.push({ textBox, section })
          req.session.data.queriesEatDrink = queriesEatDrink

          let href;

          switch (req.session.data['who-is-question-for-eating']) {
            case("Unassigned"):
            href = 'case-review/unassigned-questions';
            break;
            case("Claimant"):
            href = 'case-review/questions-claimant';
            break;
            case("Internal medical support"):
            href = 'case-review/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = 'case-review/questions-internal-non-medical-support';
            break;
            case("External health professional"):
            href = 'case-review/questions-external-medical-health-professional';
            break;
            //this is the hardcoded bit if one of the links fails
            default:
            href = 'case-review/tasklist';
          }

        //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].action = req.session.data['who-is-question-for-eating']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].href = href;
          res.redirect('case-review/activities/taking-nutrition')
          }
        })

        //Start routes for managing treatments: questions
          router.post('case-review/activities/managing-treatments', (req, res, next) => {
              if (req.session.data['who-is-question-for-treatments']) {
                console.log('is-this-calling', req.session.data)
                const textBox = req.session.data['query-content']
                const section = req.session.data.source

                const queriesTreatments = req.session.data.queriesTreatments || []
                queriesTreatments.push({ textBox, section })
                req.session.data.queriesTreatments = queriesTreatments

                let href;

                switch (req.session.data['who-is-question-for-treatments']) {
                  case("Unassigned"):
                  href = 'case-review/unassigned-questions';
                  break;
                  case("Claimant"):
                  href = 'case-review/questions-claimant';
                  break;
                  case("Internal medical support"):
                  href = 'case-review/questions-internal-medical-support';
                  break;
                  case("Internal non medical support"):
                  href = 'case-review/questions-internal-non-medical-support';
                  break;
                  case("External health professional"):
                  href = 'case-review/questions-external-medical-health-professional';
                  break;
                  //this is the hardcoded bit if one of the links fails
                  default:
                  href = 'case-review/tasklist';
                }

              //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                req.session.data.queriesTreatments[req.session.data.queriesTreatments.length - 1].action = req.session.data['who-is-question-for-treatments']
                req.session.data.queriesTreatments[req.session.data.queriesTreatments.length - 1].href = href;
                res.redirect('case-review/activities/managing-treatments')

                }
              })


//Start routes for washing and bathing: questions
router.post('case-review/activities/washing-and-bathing', (req, res, next) => {
    if (req.session.data['who-is-question-for-washing']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesWashing = req.session.data.queriesWashing || []
      queriesWashing.push({ textBox, section })
      req.session.data.queriesWashing = queriesWashing

      let href;

      switch (req.session.data['who-is-question-for-washing']) {
        case("Unassigned"):
        href = 'case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = 'case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = 'case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = 'case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = 'case-review/questions-external-medical-health-professional';
        break;
        //this is the hardcoded bit if one of the links fails
        default:
        href = 'case-review/tasklist';
      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].action = req.session.data['who-is-question-for-washing']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].href = href;
      res.redirect('case-review/activities/washing-and-bathing')

      }
    })


//Start routes for managing toilet needs: questions
  router.post('case-review/activities/managing-toilet-needs', (req, res, next) => {
      if (req.session.data['who-is-question-for-toilet']) {
        console.log('is-this-calling', req.session.data)
        const textBox = req.session.data['query-content']
        const section = req.session.data.source

        const queriesToilet = req.session.data.queriesToilet || []
        queriesToilet.push({ textBox, section })
        req.session.data.queriesToilet = queriesToilet

        let href;

        switch (req.session.data['who-is-question-for-toilet']) {
          case("Unassigned"):
          href = 'case-review/unassigned-questions';
          break;
          case("Claimant"):
          href = 'case-review/questions-claimant';
          break;
          case("Internal medical support"):
          href = 'case-review/questions-internal-medical-support';
          break;
          case("Internal non medical support"):
          href = 'case-review/questions-internal-non-medical-support';
          break;
          case("External health professional"):
          href = 'case-review/questions-external-medical-health-professional';
          break;
          //this is the hardcoded bit if one of the links fails
          default:
          href = 'case-review/tasklist';
        }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].action = req.session.data['who-is-question-for-toilet']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].href = href;
            res.redirect('case-review/activities/managing-toilet-needs')

            }
          })

    //Start routes for dressing and undressing: questions
      router.post('case-review/activities/dressing-and-undressing', (req, res, next) => {
          if (req.session.data['who-is-question-for-dressing']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesDressing = req.session.data.queriesDressing || []
            queriesDressing.push({ textBox, section })
            req.session.data.queriesDressing = queriesDressing

            let href;

            switch (req.session.data['who-is-question-for-dressing']) {
              case("Unassigned"):
              href = 'case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = 'case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = 'case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = 'case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = 'case-review/questions-external-medical-health-professional';
              break;
              //this is the hardcoded bit if one of the links fails
              default:
              href = 'case-review/tasklist';
            }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].action = req.session.data['who-is-question-for-dressing']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].href = href;
                  res.redirect('case-review/activities/dressing-and-undressing')

                  }
                })

          //Start routes for talking and understanding: questions
            router.post('case-review/activities/communicating-verbally', (req, res, next) => {
                if (req.session.data['who-is-question-for-talking']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesTalking = req.session.data.queriesTalking || []
                  queriesTalking.push({ textBox, section })
                  req.session.data.queriesTalking = queriesTalking

                  let href;

                  switch (req.session.data['who-is-question-for-talking']) {
                    case("Unassigned"):
                    href = 'case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = 'case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = 'case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = 'case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = 'case-review/questions-external-medical-health-professional';
                    break;
                    //this is the hardcoded bit if one of the links fails
                    default:
                    href = 'case-review/tasklist';
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].action = req.session.data['who-is-question-for-talking']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].href = href;
                  res.redirect('case-review/activities/communicating-verbally')

                  }
                })

          //Start routes for Reading and understanding: questions
            router.post('case-review/activities/reading-and-understanding', (req, res, next) => {
                if (req.session.data['who-is-question-for-reading']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesReading = req.session.data.queriesReading || []
                  queriesReading.push({ textBox, section })
                  req.session.data.queriesReading = queriesReading

                  let href;

                  switch (req.session.data['who-is-question-for-reading']) {
                    case("Unassigned"):
                    href = 'case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = 'case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = 'case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = 'case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = 'case-review/questions-external-medical-health-professional';
                    break;
                    //this is the hardcoded bit if one of the links fails
                    default:
                    href = 'case-review/tasklist';
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].action = req.session.data['who-is-question-for-reading']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].href = href;
                  res.redirect('case-review/activities/reading-and-understanding')

                  }
                })

          //Start routes for Mixing with others: questions
            router.post('case-review/activities/engaging-face-to-face', (req, res, next) => {
                if (req.session.data['who-is-question-for-mixing-people']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMixing = req.session.data.queriesMixing || []
                  queriesMixing.push({ textBox, section })
                  req.session.data.queriesMixing = queriesMixing

                  let href;

                  switch (req.session.data['who-is-question-for-mixing-people']) {
                    case("Unassigned"):
                    href = 'case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = 'case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = 'case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = 'case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = 'case-review/questions-external-medical-health-professional';
                    break;
                    //this is the hardcoded bit if one of the links fails
                    default:
                    href = 'case-review/tasklist';
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].action = req.session.data['who-is-question-for-mixing-people']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].href = href;
                  res.redirect('case-review/activities/engaging-face-to-face')

                  }
                })

      //Start routes for managing money: questions
        router.post('case-review/activities/managing-money', (req, res, next) => {
            if (req.session.data['who-is-question-for-money']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesMoney = req.session.data.queriesMoney || []
              queriesMoney.push({ textBox, section })
              req.session.data.queriesMoney = queriesMoney

              let href;

              switch (req.session.data['who-is-question-for-money']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].action = req.session.data['who-is-question-for-money']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].href = href;
              res.redirect('case-review/activities/managing-money')

              }
            })
    //Start routes for planning, following journeys: questions
      router.post('case-review/activities/planning-and-following-journeys', (req, res, next) => {
          if (req.session.data['who-is-question-for-planning']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesPlanning = req.session.data.queriesPlanning || []
            queriesPlanning.push({ textBox, section })
            req.session.data.queriesPlanning = queriesPlanning

            let href;

            switch (req.session.data['who-is-question-for-planning']) {
              case("Unassigned"):
              href = 'case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = 'case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = 'case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = 'case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = 'case-review/questions-external-medical-health-professional';
              break;
              //this is the hardcoded bit if one of the links fails
              default:
              href = 'case-review/tasklist';
            }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].action = req.session.data['who-is-question-for-planning']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].href = href;
            res.redirect('case-review/activities/planning-and-following-journeys')

            }
          })


          //Start routes for moving around: questions
            router.post('case-review/activities/moving-around', (req, res, next) => {
                if (req.session.data['who-is-question-for-moving']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMoving = req.session.data.queriesMoving || []
                  queriesMoving.push({ textBox, section })
                  req.session.data.queriesMoving = queriesMoving

                  let href;

                  switch (req.session.data['who-is-question-for-moving']) {
                    case("Unassigned"):
                    href = 'case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = 'case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = 'case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = 'case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = 'case-review/questions-external-medical-health-professional';
                    break;
                    //this is the hardcoded bit if one of the links fails
                    default:
                    href = 'case-review/tasklist';
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].action = req.session.data['who-is-question-for-moving']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].href = href;
                  res.redirect('case-review/activities/moving-around')

                  }
                })


                //Start routes for additional information: questions
                  router.post('case-review/additional-information', (req, res, next) => {
                      if (req.session.data['who-is-question-for-add-info']) {
                        console.log('is-this-calling', req.session.data)
                        const textBox = req.session.data['query-content']
                        const section = req.session.data.source

                        const queriesAdditional = req.session.data.queriesAdditional || []
                        queriesAdditional.push({ textBox, section })
                        req.session.data.queriesAdditional = queriesAdditional

                        let href;

                        switch (req.session.data['who-is-question-for-add-info']) {
                          case("Unassigned"):
                          href = 'case-review/unassigned-questions';
                          break;
                          case("Claimant"):
                          href = 'case-review/questions-claimant';
                          break;
                          case("Internal medical support"):
                          href = 'case-review/questions-internal-medical-support';
                          break;
                          case("Internal non medical support"):
                          href = 'case-review/questions-internal-non-medical-support';
                          break;
                          case("External health professional"):
                          href = 'case-review/questions-external-medical-health-professional';
                          break;
                          //this is the hardcoded bit if one of the links fails
                          default:
                          href = 'case-review/tasklist';
                        }

                      //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].action = req.session.data['who-is-question-for-add-info']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].href = href;
                        res.redirect('case-review/additional-information')

                        }
                      })


      //Routes for query condtion1
      router.post('case-review/condition-one', (req, res, next) => {
          if (req.session.data['who-is-question-for-cond-one']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesConditionOne = req.session.data.queriesConditionOne || []
            queriesConditionOne.push({ textBox, section })
            req.session.data.queriesConditionOne = queriesConditionOne

            let href;

            switch (req.session.data['who-is-question-for-cond-one']) {
              case("Unassigned"):
              href = 'case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = 'case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = 'case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = 'case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = 'case-review/questions-external-medical-health-professional';
              break;
              //this is the hardcoded bit if one of the links fails
              default:
              href = 'case-review/questions';
            }

          //  req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].content = req.session.data['query-content']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].action = req.session.data['who-is-question-for-cond-one']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].href = href;
            res.redirect('case-review/condition-one')

            }
          })

        //Routes for query condtion2
        router.post('case-review/condition-two', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-two']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionTwo = req.session.data.queriesConditionTwo || []
              queriesConditionTwo.push({ textBox, section })
              req.session.data.queriesConditionTwo = queriesConditionTwo

              let href;

              switch (req.session.data['who-is-question-for-cond-two']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].action = req.session.data['who-is-question-for-cond-two']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].href = href;
              res.redirect('case-review/condition-two')

              }
        })

        //Routes for query condtion3
        router.post('case-review/condition-three', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-three']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionThree = req.session.data.queriesConditionThree || []
              queriesConditionThree.push({ textBox, section })
              req.session.data.queriesConditionThree = queriesConditionThree

              let href;

              switch (req.session.data['who-is-question-for-cond-three']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].action = req.session.data['who-is-question-for-cond-three']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].href = href;
              res.redirect('case-review/condition-three')

              }
        })

        //Routes for query condtion4
        router.post('case-review/condition-four', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-four']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFour = req.session.data.queriesConditionFour || []
              queriesConditionFour.push({ textBox, section })
              req.session.data.queriesConditionFour = queriesConditionFour

              let href;

              switch (req.session.data['who-is-question-for-cond-four']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].action = req.session.data['who-is-question-for-cond-four']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].href = href;
              res.redirect('case-review/condition-four')

              }
        })

        //Routes for query condtion5
        router.post('case-review/condition-five', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-five']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFive = req.session.data.queriesConditionFive || []
              queriesConditionFive.push({ textBox, section })
              req.session.data.queriesConditionFive = queriesConditionFive

              let href;

              switch (req.session.data['who-is-question-for-cond-five']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].action = req.session.data['who-is-question-for-cond-five']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].href = href;
              res.redirect('case-review/condition-five')

              }
        })

        //Routes for query condtion6
        router.post('case-review/condition-six', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-six']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSix = req.session.data.queriesConditionSix || []
              queriesConditionSix.push({ textBox, section })
              req.session.data.queriesConditionSix = queriesConditionSix

              let href;

              switch (req.session.data['who-is-question-for-cond-six']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;

                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].action = req.session.data['who-is-question-for-cond-six']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].href = href;
              res.redirect('case-review/condition-six')

              }
        })


        //Routes for query condtion7
        router.post('case-review/condition-seven', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-seven']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSeven = req.session.data.queriesConditionSeven || []
              queriesConditionSeven.push({ textBox, section })
              req.session.data.queriesConditionSeven = queriesConditionSeven

              let href;

              switch (req.session.data['who-is-question-for-cond-seven']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].action = req.session.data['who-is-question-for-cond-seven']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].href = href;
              res.redirect('case-review/condition-seven')

              }
        })


        //Routes for query condtion8
        router.post('case-review/condition-eight', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-eight']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionEight = req.session.data.queriesConditionEight || []
              queriesConditionEight.push({ textBox, section })
              req.session.data.queriesConditionEight = queriesConditionEight

              let href;

              switch (req.session.data['who-is-question-for-cond-eight']) {
                case("Unassigned"):
                href = 'case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = 'case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = 'case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = 'case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = 'case-review/questions-external-medical-health-professional';
                break;
                //this is the hardcoded bit if one of the links fails
                default:
                href = 'case-review/tasklist';
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].action = req.session.data['who-is-question-for-cond-eight']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].href = href;
              res.redirect('case-review/condition-eight')

              }
        })



//Start routes for scoring -- Old  stuff???********************************************************************************
router.post('case-review/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('case-review/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
          //this is the hardcoded bit if one of the links fails
          default:
          points = 'case-review/tasklist';
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('case-review/review-activity-descriptors')
    //}
})

router.post('case-review/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('case-review/review-activity-descriptors')
})


//Create query taking nutrition activity
router.post('case-review/activities/taking-nutrition', (req, res, next) => {
  console.log('case-review/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-taking-nutrition')
})

router.post('case-review/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/taking-nutrition')
})

//Create query managing Treatments activity
router.post('case-review/activities/managing-treatments', (req, res, next) => {
  console.log('case-review/activities/managing-treatments', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-managing-treatments')
})

router.post('case-review/set-action/set-action-managing-treatments', (req, res, next) => {
  console.log('this is managing treatments')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/managing-treatments')
})

//Create query washing and bathing activity
router.post('case-review/activities/washing-and-bathing', (req, res, next) => {
  console.log('case-review/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-washing-and-bathing')
})

router.post('case-review/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('case-review/activities/managing-toilet-needs', (req, res, next) => {
  console.log('case-review/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-managing-toilet-needs')
})

router.post('case-review/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('case-review/activities/dressing-and-undressing', (req, res, next) => {
  console.log('case-review/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-dressing-and-undressing')
})

router.post('case-review/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('case-review/activities/communicating-verbally', (req, res, next) => {
  console.log('case-review/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-communicating-verbally')
})

router.post('case-review/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('case-review/activities/reading-and-understanding', (req, res, next) => {
  console.log('case-review/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-reading-and-understanding')
})

router.post('case-review/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('case-review/activities/engaging-face-to-face', (req, res, next) => {
  console.log('case-review/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-engage-face-to-face')
})

router.post('case-review/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/engaging-face-to-face')
})

//Create query managing money activity
router.post('case-review/activities/managing-money', (req, res, next) => {
  console.log('case-review/activities/managing-money', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-managing-money')
})

router.post('case-review/set-action/set-action-managing-money', (req, res, next) => {
  console.log('this is managing-money')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/managing-money')
})

//Create query planning and following journeys activity
router.post('case-review/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('case-review/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-planning-and-following-journeys')
})

router.post('case-review/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('case-review/activities/moving-around', (req, res, next) => {
  console.log('case-review/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/set-action/set-action-moving-around')
})

router.post('case-review/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('case-review/evidence-detail', (req, res, next) => {
    if (req.session.data['evidence-one-note'] == "question-about-this-condition" ) {
      console.log('case-review/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('case-review/set-action/set-action-evidence')

    } else if (req.session.data['evidence-one-note'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('case-review/evidence-detail', req.session.data)
            const name = req.session.data['evidence-query']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidenceOne = req.session.data.conditionsEvidenceOne || []
            conditionsEvidenceOne.push({ name, section })
            req.session.data.conditionsEvidenceOne = conditionsEvidenceOne
            res.redirect('case-review/tagging-evidence/evidence-one')

  } else {
    console.log('case-review/evidence-detail', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceOne = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceOne = req.session.data.outScopeEvidenceOne || []
    outScopeEvidenceOne.push({ name, section, scopeEvidenceOne })
    req.session.data.outScopeEvidenceOne = outScopeEvidenceOne
    res.redirect('case-review/evidence-detail')

    }
    })

// follow up for tagging important info: evidence one
    router.post('case-review/tagging-evidence/evidence-one', (req, res, next) => {
      console.log('this is evidence one')
      console.log(req.session.data)
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].evidenceNoteOne = req.session.data['query-content']
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidenceOne)
      res.redirect('case-review/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('case-review/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/evidence-detail')
})

// follow up roiute for out of scope: evidence one
router.post('case-review/evidence-detail', (req, res, next) => {
  console.log('this is evidence one out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceOne[req.session.data.outScopeEvidenceOne.length - 1].scopeEvidenceOne = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/evidence-detail')
})

//Routes for queries linked to Evidence number 2

router.post('case-review/evidence-detail-two', (req, res, next) => {
    if (req.session.data['evidence-note-two'] == "question-about-this-condition" ) {
      console.log('case-review/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidenceTwo = req.session.data.queriesEvidenceTwo || []
      queriesEvidenceTwo.push({ name, section })
      req.session.data.queriesEvidenceTwo = queriesEvidenceTwo
      res.redirect('case-review/set-action/set-action-evidence-two')

    } else if (req.session.data['evidence-note-two'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('case-review/evidence-detail-two', req.session.data)
            const name = req.session.data['query-content']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidence = req.session.data.conditionsEvidence || []
            conditionsEvidence.push({ name, section })
            req.session.data.conditionsEvidence = conditionsEvidence
            res.redirect('case-review/tagging-evidence/evidence-two')

  } else {
    console.log('case-review/evidence-detail-two', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceTwo = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceTwo = req.session.data.outScopeEvidenceTwo || []
    outScopeEvidenceTwo.push({ name, section, scopeEvidenceTwo })
    req.session.data.outScopeEvidenceTwo = outScopeEvidenceTwo
    res.redirect('case-review/evidence-detail-two')

    }
    })

// follow up for tagging important info: evidence two
    router.post('case-review/tagging-evidence/evidence-two', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidenceNote = req.session.data['query-content']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('case-review/evidence-detail-two')
    })

// follow up route for linking queries to evidence number two
router.post('case-review/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = 'case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = 'case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = 'case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = 'case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = 'case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = 'case-review/none-these-action';
    break;
    //this is the hardcoded bit if one of the links fails
    default:
    href = 'case-review/tasklist';
  }

  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/evidence-detail-two')
})

// follow up route for out of scope: evidence two
router.post('case-review/evidence-detail-two', (req, res, next) => {
  console.log('this is evidence two out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceTwo[req.session.data.outScopeEvidenceTwo.length - 1].scopeEvidenceTwo = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('case-review/evidence-detail-two')
})
//Routes for queries appearing on action page

router.post('case-review/contact-claimant-action', (req, res, next) => {
  console.log('case-review/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('case-review/contact-claimant-action')
})

router.post('case-review/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('case-review/contact-claimant-action')
})
