# An optional practice quiz

This example keeps a readable question inside an optional Markdoc component.

{% pop-quiz
  id="stop-mixing"
  question="When should you stop mixing?"
  choices=[
    {"id": "perfectly-smooth", "label": "When the batter is perfectly smooth", "feedback": "A few small lumps are fine. Extra mixing can make the cake tougher."},
    {"id": "no-dry-flour", "label": "When no dry flour remains", "feedback": "Correct! Check the bottom of the bowl too. A few small lumps are fine."},
    {"id": "five-more-minutes", "label": "After five more minutes", "feedback": "Check the batter rather than a timer. Stop once no dry flour remains."}
  ]
  answer="no-dry-flour"
  mode="practice"
%}

**Pop quiz: When should you stop mixing?**

1. When the batter is perfectly smooth
2. When no dry flour remains
3. After five more minutes

Choose one answer and tell your agent. The agent will explain the answer and let you try again. This practice question does not complete the exercise or prove that you prepared the batter.

{% /pop-quiz %}
