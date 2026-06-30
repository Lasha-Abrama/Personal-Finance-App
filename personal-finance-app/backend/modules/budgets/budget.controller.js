const budgetService = require("./budget.service");

const getBudgets = async (req, res) => {
  try {
    const budgets = await budgetService.getBudgets(req.userId);
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createBudget = async (req, res) => {
  try {
    const { category, maximum, theme } = req.body;

    if (!category || !maximum || !theme) {
      return res
        .status(400)
        .json({ message: "Required fields: category, maximum, theme" });
    }

    const budget = await budgetService.createBudget({
      userId: req.userId,
      category,
      maximum,
      theme,
    });

    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { category, maximum, theme } = req.body;

    const budget = await budgetService.updateBudget({
      userId: req.userId,
      id: req.params.id,
      category,
      maximum,
      theme,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const budget = await budgetService.deleteBudget({
      userId: req.userId,
      id: req.params.id,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBudgets, createBudget, updateBudget, deleteBudget };
