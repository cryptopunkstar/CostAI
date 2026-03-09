import React, { useState } from 'react';
import { Droplet, DollarSign, Calculator, Zap } from 'lucide-react';

function CostAIApp() {
  const [prompt, setPrompt] = useState('');
  const [tokenCount, setTokenCount] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState(null);
  const [results, setResults] = useState(null);

  // Model pricing (USD per 1M tokens) and water footprint (liters per 1000 tokens)
  const models = {
    'Gemini 3': {
      inputCost: 0.075,
      outputCost: 0.30,
      waterPerToken: 0.5,
      color: 'from-blue-500 to-cyan-500',
      icon: '🔷'
    },
    'Claude Sonnet 4.6': {
      inputCost: 3.00,
      outputCost: 15.00,
      waterPerToken: 0.45,
      color: 'from-orange-500 to-amber-500',
      icon: '🟠'
    },
    'GPT-4.5': {
      inputCost: 2.50,
      outputCost: 10.00,
      waterPerToken: 0.52,
      color: 'from-emerald-500 to-teal-500',
      icon: '🟢'
    }
  };

  const estimateTokens = () => {
    if (!prompt.trim()) return;
    const chars = prompt.length;
    const estimated = Math.ceil(chars / 4);
    setEstimatedTokens(estimated);
    setTokenCount(estimated.toString());
  };

  const calculateResults = () => {
    const tokens = parseInt(tokenCount);
    if (!tokens || tokens <= 0) return;

    const calculatedResults = {};
    
    Object.entries(models).forEach(([modelName, data]) => {
      const inputTokens = tokens * 0.5;
      const outputTokens = tokens * 0.5;
      
      const inputCostUSD = (inputTokens / 1000000) * data.inputCost;
      const outputCostUSD = (outputTokens / 1000000) * data.outputCost;
      const totalCostUSD = inputCostUSD + outputCostUSD;
      
      const waterLiters = (tokens / 1000) * data.waterPerToken;
      
      calculatedResults[modelName] = {
        cost: totalCostUSD,
        water: waterLiters,
        ...data
      };
    });

    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold text-white">CostAI</h1>
          </div>
          <p className="text-xl text-purple-200">Compare token costs and environmental impact across AI models</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Token Counter</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Enter your prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type or paste your prompt here..."
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
            
            <button
              onClick={estimateTokens}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Estimate Tokens
            </button>

            {estimatedTokens && (
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-4 mt-4">
                <p className="text-purple-200 text-sm mb-1">Estimated tokens:</p>
                <p className="text-3xl font-bold text-white">{estimatedTokens.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Comparison Calculator</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Token count
              </label>
              <input
                type="number"
                value={tokenCount}
                onChange={(e) => setTokenCount(e.target.value)}
                placeholder="Enter token count"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={calculateResults}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Calculate Comparison
            </button>
          </div>
        </div>

        {results && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Model Comparison</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(results).map(([modelName, data]) => (
                <div
                  key={modelName}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{data.icon}</span>
                    <h3 className="text-xl font-bold text-white">{modelName}</h3>
                  </div>

                  <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <h4 className="text-sm font-semibold text-purple-200 uppercase tracking-wide">Cost</h4>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">
                      ${data.cost.toFixed(6)}
                    </p>
                    <div className="text-xs text-purple-300 space-y-1">
                      <p>Input: ${data.inputCost}/M tokens</p>
                      <p>Output: ${data.outputCost}/M tokens</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Droplet className="w-5 h-5 text-blue-400" />
                      <h4 className="text-sm font-semibold text-purple-200 uppercase tracking-wide">Water Footprint</h4>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">
                      {data.water.toFixed(2)}L
                    </p>
                    <p className="text-xs text-purple-300">
                      {data.waterPerToken}L per 1K tokens
                    </p>
                  </div>

                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${data.color}`}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-purple-200 uppercase tracking-wide mb-3">Most Cost-Effective</h4>
                  {(() => {
                    const cheapest = Object.entries(results).sort((a, b) => a[1].cost - b[1].cost)[0];
                    return (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cheapest[1].icon}</span>
                        <div>
                          <p className="text-white font-semibold">{cheapest[0]}</p>
                          <p className="text-sm text-purple-300">${cheapest[1].cost.toFixed(6)}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-purple-200 uppercase tracking-wide mb-3">Lowest Water Usage</h4>
                  {(() => {
                    const greenest = Object.entries(results).sort((a, b) => a[1].water - b[1].water)[0];
                    return (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{greenest[1].icon}</span>
                        <div>
                          <p className="text-white font-semibold">{greenest[0]}</p>
                          <p className="text-sm text-purple-300">{greenest[1].water.toFixed(2)}L</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12 text-purple-300 text-sm">
          <p>💡 Estimates based on standard pricing and environmental data</p>
          <p className="mt-2">Token calculation assumes 50/50 split between input and output</p>
        </div>
      </div>
    </div>
  );
}

export default CostAIApp;