// ============================================================================
// Budget Alert Module
// ============================================================================
// Creates a monthly budget with email alerts at 50%, 75%, 90%, and 100%
// thresholds to help manage Azure costs effectively.
// ============================================================================

targetScope = 'subscription'

@description('Budget name')
param budgetName string

@description('Monthly budget amount in USD')
param amount int

@description('Resource Group ID to scope the budget to')
param resourceGroupId string

@description('Email addresses for budget alerts')
param contactEmails array

@description('Budget start date (defaults to first day of current month)')
param startDate string = utcNow('yyyy-MM-01')

// ============================================================================
// VARIABLES
// ============================================================================

var endDate = '2099-12-31' // Far future date (budget doesn't expire)

// ============================================================================
// BUDGET
// ============================================================================

resource budget 'Microsoft.Consumption/budgets@2023-11-01' = {
  name: budgetName
  properties: {
    category: 'Cost'
    amount: amount
    timeGrain: 'Monthly'
    timePeriod: {
      startDate: startDate
      endDate: endDate
    }
    filter: {
      dimensions: {
        name: 'ResourceGroupName'
        operator: 'In'
        values: [
          last(split(resourceGroupId, '/'))
        ]
      }
    }
    notifications: {
      // Alert at 50% of budget
      Alert50Percent: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 50
        contactEmails: contactEmails
        thresholdType: 'Actual'
      }
      // Alert at 75% of budget
      Alert75Percent: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 75
        contactEmails: contactEmails
        thresholdType: 'Actual'
      }
      // Alert at 90% of budget
      Alert90Percent: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 90
        contactEmails: contactEmails
        thresholdType: 'Actual'
      }
      // Alert at 100% of budget
      Alert100Percent: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 100
        contactEmails: contactEmails
        thresholdType: 'Actual'
      }
      // Forecasted alert at 100%
      ForecastedAlert100Percent: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 100
        contactEmails: contactEmails
        thresholdType: 'Forecasted'
      }
    }
  }
}

// ============================================================================
// OUTPUTS
// ============================================================================

output budgetId string = budget.id
output budgetName string = budget.name
